import { useEffect, useState, useRef, useCallback, createContext } from "react";
import { OpenVidu } from "openvidu-browser";
import { GameLayout } from "../layouts/GameLayout.jsx";
import { GameLogic } from "../components/game/GameLogic.jsx";
import { BASE_URL } from "../api/url/baseURL.js";
import axios from "axios";
import { useLocation } from "react-router-dom";

{
  /*
  Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
  1. You might have mismatching versions of React and the renderer (such as React DOM)
  2. You might be breaking the Rules of Hooks
  3. You might have more than one copy of React in the same app
  */
}

export const ViduContext = createContext();

export const Game = () => {
  const APPLICATION_SERVER_URL = BASE_URL;

  const location = useLocation();
  const { _roomId, _roomName } = location.state;

  const [mySessionId, setMySessionId] = useState(_roomId);
  const [myUserName, setMyUserName] = useState(
    localStorage.getItem("nickname")
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  // const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);
  const [loading, setLoading] = useState(true);

  const OV = useRef(new OpenVidu());

  OV.current.enableProdMode();

  //
  const setSelfCamera = (state) => {
    if (mainStreamManager) {
      mainStreamManager.publishVideo(state);
    }
  };

  const setSelfMic = (state) => {
    if (mainStreamManager) {
      mainStreamManager.publishAudio(state);
    }
  };

  const setUserVideo = (state) => {
    let userVideo = document.querySelectorAll("video");
    userVideo.forEach((item) => {
      item.style.display = state ? "block" : "none";
    });
  };

  const setUserAudio = (state) => {
    let userAudio = document.querySelectorAll("video");
    userAudio.forEach((item) => {
      if (item.id === "self") {
        item.muted = true;
      } else {
        item.muted = !state;
      }
    });
  };
  //

  const handleChangeSessionId = useCallback((e) => {
    setMySessionId(e.target.value);
  }, []);

  const handleChangeUserName = useCallback((e) => {
    setMyUserName(e.target.value);
  }, []);

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager]
  );

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
      console.log("subscriber", subscriber);
    });

    // mySession.on("reconnecting", () => {
    //   mySession.disconnect();
    // });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  }, []);

  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "300x200",
            frameRate: 10,
            insertMode: "APPEND",
            mirror: true,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setMainStreamManager(publisher);
          // setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
          setSubscribers((subscribers) => [...subscribers]);
        } catch (error) {
          console.log(
            "There was an error connecting to the session:",
            error.code,
            error.message
          );
        }
      });
    }
  }, [session, myUserName]);

  const leaveSession = () => {
    // Leave the session
    if (session) {
      console.log("===== 연결종료 =====");
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setMainStreamManager(undefined);
    // setPublisher(undefined);
  };

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            // setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager, 0);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "/api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    return response.data; // The token
  };

  return (
    <ViduContext.Provider
      value={{
        _roomName,
        mainStreamManager,
        subscribers,
        setSelfCamera,
        setSelfMic,
        setUserVideo,
        setUserAudio,
        leaveSession,
      }}
    >
      <div className="mx-auto my-auto">
        <div>
          <GameLayout>
            <GameLogic />
          </GameLayout>
        </div>
      </div>
    </ViduContext.Provider>
  );
};

// class OpenViduSetting extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       mySessionId: props.roomId,
//       myUserName: props.nickname,
//       myId: props.myId,
//       session: undefined,
//       mainStreamManager: undefined,
//       subscribers: [],
//       loading: true,
//     };

//     this.joinSession = this.joinSession.bind(this);
//     this.leaveSession = this.leaveSession.bind(this);
//     this.switchCamera = this.switchCamera.bind(this);
//     this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
//     this.handleChangeUserName = this.handleChangeUserName.bind(this);
//     this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
//     this.onbeforeunload = this.onbeforeunload.bind(this);
//     this.setSelfCamera = this.setSelfCamera.bind(this);
//     this.setSelfMic = this.setSelfMic.bind(this);
//     this.setUserVideo = this.setUserVideo.bind(this);
//     this.setUserAudio = this.setUserAudio.bind(this);
//   }

//   setSelfCamera(cameraOn) {
//     if (this.state.mainStreamManager) {
//       this.state.mainStreamManager.publishVideo(cameraOn);
//     }
//   }

//   setSelfMic(micOn) {
//     if (this.state.mainStreamManager) {
//       this.state.mainStreamManager.publishAudio(micOn);
//     }
//   }

//   setUserVideo(videoOn) {
//     let userVideo = document.querySelectorAll("video");
//     userVideo.forEach((item) => {
//       item.style.display = videoOn ? "block" : "none";
//     });
//   }

//   setUserAudio(soundOn) {
//     let userAudio = document.querySelectorAll("video");
//     userAudio.forEach((item) => {
//       if (item.id === "me") {
//         item.muted = true;
//       } else {
//         item.muted = !soundOn;
//       }
//     });
//   }

//   componentDidMount() {
//     window.addEventListener("beforeunload", this.onbeforeunload);
//     this.joinSession();
//   }

//   componentWillUnmount() {
//     window.removeEventListener("beforeunload", this.onbeforeunload);
//   }

//   onbeforeunload(event) {
//     this.leaveSession();
//   }

//   handleChangeSessionId(e) {
//     this.setState({
//       mySessionId: e.target.value,
//     });
//   }

//   handleChangeUserName(e) {
//     this.setState({
//       myUserName: e.target.value,
//     });
//   }

//   handleMainVideoStream(stream) {
//     if (this.state.mainStreamManager !== stream) {
//       this.setState({
//         mainStreamManager: stream,
//       });
//     }
//   }

//   deleteSubscriber(streamManager) {
//     let subscribers = this.state.subscribers;
//     let index = subscribers.indexOf(streamManager, 0);
//     if (index > -1) {
//       subscribers.splice(index, 1);
//       this.setState({
//         subscribers: subscribers,
//       });
//     }
//   }

//   async joinSession() {
//     // --- 1) Get an OpenVidu object ---

//     this.OV = new OpenVidu();

//     // --- 2) Init a session ---

//     this.setState(
//       {
//         session: this.OV.initSession(),
//       },
//       async () => {
//         const mySession = this.state.session;

//         // --- 3) Specify the actions when events take place in the session ---

//         // On every new Stream received...
//         mySession.on("streamCreated", (event) => {
//           // Subscribe to the Stream to receive it. Second parameter is undefined
//           // so OpenVidu doesn't create an HTML video by its own
//           const subscriber = mySession.subscribe(event.stream, undefined);
//           let subscribers = this.state.subscribers;
//           subscribers.push(subscriber);

//           // Update the state with the new subscribers
//           this.setState((prev) => ({
//             subscribers: [...prev.subscribers, subscriber],
//           }));
//         });

//         // On every Stream destroyed...
//         mySession.on("streamDestroyed", (event) => {
//           // Remove the stream from 'subscribers' array
//           this.deleteSubscriber(event.stream.streamManager);
//         });

//         // On every asynchronous exception...
//         mySession.on("exception", (exception) => {
//           console.warn(exception);
//         });

//         // --- 4) Connect to the session with a valid user token ---

//         // Get a token from the OpenVidu deployment
//         this.getToken().then((token) => {
//           // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
//           // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
//           mySession
//             .connect(token, { clientData: this.state.myUserName })
//             .then(async () => {
//               // --- 5) Get your own camera stream ---

//               // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
//               // element: we will manage it on our own) and with the desired properties
//               const publisher = await this.OV.initPublisherAsync(undefined, {
//                 audioSource: undefined, // The source of audio. If undefined default microphone
//                 videoSource: undefined, // The source of video. If undefined default webcam
//                 publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
//                 publishVideo: true, // Whether you want to start publishing with your video enabled or not
//                 resolution: "300x200", // The resolution of your video
//                 frameRate: 10, // The frame rate of your video
//                 insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
//                 mirror: true, // Whether to mirror your local video or not
//               });

//               // --- 6) Publish your stream ---

//               mySession.publish(publisher);

//               // Obtain the current video device in use
//               const devices = await this.OV.getDevices();
//               const videoDevices = devices.filter(
//                 (device) => device.kind === "videoinput"
//               );
//               const currentVideoDeviceId = publisher.stream
//                 .getMediaStream()
//                 .getVideoTracks()[0]
//                 .getSettings().deviceId;
//               const currentVideoDevice = videoDevices.find(
//                 (device) => device.deviceId === currentVideoDeviceId
//               );

//               // Set the main video in the page to display our webcam and store our Publisher
//               this.setState({
//                 currentVideoDevice: currentVideoDevice,
//                 mainStreamManager: publisher,
//               });
//             })
//             .catch((error) => {
//               console.log(
//                 "There was an error connecting to the session:",
//                 error.code,
//                 error.message
//               );
//             });
//         });
//       }
//     );
//   }

//   leaveSession() {
//     // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

//     const mySession = this.state.session;

//     if (mySession) {
//       mySession.disconnect();
//     }

//     // Empty all properties...
//     this.OV = null;
//     this.setState({
//       session: undefined,
//       mainStreamManager: undefined,
//       publisher: undefined,
//     });
//   }

//   async switchCamera() {
//     try {
//       const devices = await this.OV.getDevices();
//       const videoDevices = devices.filter(
//         (device) => device.kind === "videoinput"
//       );

//       if (videoDevices && videoDevices.length > 1) {
//         const newVideoDevice = videoDevices.filter(
//           (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
//         );

//         if (newVideoDevice.length > 0) {
//           // Creating a new publisher with specific videoSource
//           // In mobile devices the default and first camera is the front one
//           const newPublisher = this.OV.initPublisher(undefined, {
//             videoSource: newVideoDevice[0].deviceId,
//             publishAudio: true,
//             publishVideo: true,
//             mirror: true,
//           });

//           //newPublisher.once("accessAllowed", () => {
//           await this.state.session.unpublish(this.state.mainStreamManager);

//           await this.state.session.publish(newPublisher);
//           this.setState({
//             currentVideoDevice: newVideoDevice[0],
//             mainStreamManager: newPublisher,
//             publisher: newPublisher,
//           });
//         }
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   async getToken() {
//     const sessionId = await this.createSession(this.state.mySessionId);
//     return await this.createToken(sessionId);
//   }

//   async createSession(sessionId) {
//     console.log("===== 세션 생성 =====");
//     const response = await axios.post(
//       APPLICATION_SERVER_URL + "/api/sessions",
//       { customSessionId: sessionId },
//       {
//         headers: {
//           "Content-Type": "application/json",
//           AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }
//     );
//     return response.data; // The sessionId
//   }

//   async createToken(sessionId) {
//     console.log("===== 토큰 생성 =====");
//     const response = await axios.post(
//       APPLICATION_SERVER_URL + "/api/sessions/" + sessionId + "/connections",
//       {},
//       {
//         headers: {
//           "Content-Type": "application/json",
//           AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }
//     );
//     return response.data; // The token
//   }

//   render() {
//     const subscribers = this.state.subscribers;
//     const setSelfCamera = this.setSelfCamera;
//     const setSelfMic = this.setSelfMic;
//     const setUserVideo = this.setUserVideo;
//     const setUserAudio = this.setUserAudio;
//     const leaveSession = this.leaveSession;

//     setTimeout(() => {
//       this.setState({ loading: false });
//     }, 1000);

//     return (
//       <div className="mx-auto my-auto">
//         <div>
//           <GameLayout>
//             <GameLogic
//               mainStreamManager={this.state.mainStreamManager}
//               subscribers={subscribers}
//               setSelfCamera={setSelfCamera}
//               setSelfMic={setSelfMic}
//               setUserVideo={setUserVideo}
//               setUserAudio={setUserAudio}
//               leaveSession={leaveSession}
//             />
//           </GameLayout>
//         </div>
//       </div>
//     );
//   }
// }
