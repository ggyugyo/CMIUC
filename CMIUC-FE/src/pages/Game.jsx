import { GameLayout } from "../layouts/GameLayout.jsx";
import { GameLogic } from "../components/game/GameLogic.jsx";
import React, { useState, useEffect } from "react";
// import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import { useAccessTokenState } from "../context/accessTokenContext";

const APPLICATION_SERVER_URL = "https://i9d206.p.ssafy.io";

export const Game = () => {
  // const setOpenVidu = (props) => {
  //   const { nickname } = useAccessTokenState();
  //   const location = useLocation();
  //   const gameCode = location.state.gameCode;
  //   const [OV, setOV] = useState(null);
  //   const [state, setState] = useState({
  //     mySessionId: gameCode,
  //     myUserName: nickname,
  //     session: undefined,
  //     mainStreamManager: undefined,
  //     subscribers: [],
  //     infoOn: false,
  //     amILeavedSessionNow: false,
  //     loading: true,
  //   });

  //   const setMyCamera = (cameraOn) => {
  //     if (state.mainStreamManager) {
  //       state.mainStreamManager.publishVideo(cameraOn);
  //     }
  //   };

  //   const setMyMic = (micOn) => {
  //     if (state.mainStreamManager) {
  //       state.mainStreamManager.publishAudio(micOn);
  //     }
  //   };

  //   const setUserVideo = (videoOn) => {
  //     let allVideo = document.querySelectorAll("video");
  //     allVideo.forEach((item) => {
  //       let mediaItem = item;
  //       mediaItem.style.display = videoOn ? "block" : "none";
  //     });
  //   };

  //   const setUserAudio = (soundOn) => {
  //     let allAudio = document.querySelectorAll("video");
  //     allAudio.forEach((item) => {
  //       let mediaItem = item;
  //       if (mediaItem.id === "me") {
  //         mediaItem.muted = true;
  //       } else {
  //         mediaItem.muted = !soundOn;
  //       }
  //     });
  //   };

  //   const onSetInfoOn = () => {
  //     setState((prevState) => ({ ...prevState, infoOn: !prevState.infoOn }));
  //   };

  //   const joinSession = async () => {
  //     const newOV = new OpenVidu();
  //     setOV(newOV);

  //     setState((prevState) => ({
  //       ...prevState,
  //       session: newOV.initSession(),
  //       loading: true,
  //     }));

  //     // ... rest of the joinSession function
  //   };

  //   const leaveSession = () => {
  //     const mySession = state.session;
  //     state.subscribers.map((sub) => {
  //       console.log(sub);
  //     });
  //     if (mySession) {
  //       mySession.disconnect();
  //     }

  //     setOV(null);
  //     setState({
  //       ...state,
  //       session: undefined,
  //       mainStreamManager: undefined,
  //       amILeavedSessionNow: true,
  //     });
  //   };

  //   // ... rest of the component

  //   useEffect(() => {
  //     window.addEventListener("beforeunload", onbeforeunload);
  //     joinSession();

  //     return () => {
  //       window.removeEventListener("beforeunload", onbeforeunload);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setState((prevState) => ({
  //         ...prevState,
  //         loading: false,
  //       }));
  //     }, 1000);
  //   }, []);

  return (
    <div className="mx-auto my-auto">
      <h1>하이요 !~~!~!</h1>
      <div id="session">
        <GameLayout>
          {"!state.loading" && (
            <GameLogic
            // infoOn={state.infoOn}
            // mainStreamManager={state.mainStreamManager}
            // subscribers={state.subscribers}
            // onSetInfoOn={onSetInfoOn}
            // setMyCamera={setMyCamera}
            // setMyMic={setMyMic}
            // setUserVideo={setUserVideo}
            // setUserAudio={setUserAudio}
            // leaveSession={leaveSession}
            />
          )}
        </GameLayout>
      </div>
    </div>
  );
};
