import { useState, useContext, memo, useEffect } from "react";
import { GameContext } from "./GameLogic";
import { GameVideoListItem } from "./GameVideoListItem";
import { ViduContext } from "../../pages/Game";

export const GameVideoList = () => {
  const { gameState, gameData } = useContext(GameContext);
  const {
    mainStreamManager,
    subscribers,
    setSelfCamera,
    setSelfMic,
    setUserVideo,
    setUserAudio,
  } = useContext(ViduContext);

  const [streamManagers, setStreamManagers] = useState([undefined]);

  const sortUsers = () => {
    const gameUsers = [...gameData.gameUsers].sort((a, b) => a.order - b.order);
    const selfPlayer = gameUsers.find(
      (player) => player.memberId === Number(localStorage.getItem("id"))
    );
    // console.log("selfPlayer", selfPlayer);
    const filteredGameUsers = gameUsers.filter(
      (player) => player.memberId !== Number(localStorage.getItem("id"))
    );
    const updatedGameUsers = [selfPlayer, ...filteredGameUsers];
    return updatedGameUsers;
  };

  const onStreamManagers = (idx, user) => {
    setStreamManagers((prev) => {
      let videoList = [...prev];
      while (videoList.length <= idx) {
        videoList.push(undefined);
      }
      videoList[idx] = user;
      return videoList;
    });
  };

  useEffect(() => {
    const _updatedGameUsers = sortUsers();
    subscribers.forEach((sub) => {
      console.log("구독자", sub);
      if (sub?.stream?.connection?.data !== undefined) {
        let userData = JSON.parse(sub.stream.connection.data);
        let userName = userData.clientData;
        _updatedGameUsers.forEach((user, index) => {
          if (user.nickname === userName) {
            onStreamManagers(index, sub);
          }
          console.log("나_연결 O", mainStreamManager);
          if (mainStreamManager?.stream?.connection?.data !== undefined) {
            let selfData = JSON.parse(mainStreamManager.stream.connection.data);
            let selfName = selfData.clientData;
            if (user.nickname === selfName) {
              onStreamManagers(index, mainStreamManager);
            }
          }
        });
      }
    });
    setUserVideo(true);
    setUserAudio(true);
  }, [subscribers]);

  useEffect(() => {
    const _updatedGameUsers = sortUsers();
    console.log("나_교차검증", mainStreamManager);
    _updatedGameUsers.forEach(function (user, index) {
      if (mainStreamManager?.stream?.connection?.data !== undefined) {
        let selfData = JSON.parse(mainStreamManager.stream.connection.data);
        let selfName = selfData.clientData;
        if (user.nickname === selfName) {
          onStreamManagers(index, mainStreamManager);
        }
      }
    });
    setSelfCamera(true);
    setSelfMic(true);
  }, [mainStreamManager]);

  // console.log("StreamManagers", streamManagers);
  console.log("지금 방에 있는 OpenVidu 구독자", streamManagers);

  let curTurnPlayer = undefined;
  // 나를 먼저 빼고 하단에 고정시키고, 나머지 소팅해서 화면에 고정시키기
  if (gameState === "DRAW_CARD" && gameData?.gamePlayDTO?.curTurn !== 0) {
    curTurnPlayer = [...gameData.gameUsers].find(
      (player) => player.memberId === gameData?.gamePlayDTO?.curTurn
    );
  }

  const gameUsers = [...gameData.gameUsers].sort((a, b) => a.order - b.order);
  const selfPlayer = gameUsers.find(
    (player) => player.memberId === Number(localStorage.getItem("id"))
  );
  // console.log("selfPlayer", selfPlayer);
  const filteredGameUsers = gameUsers.filter(
    (player) => player.memberId !== Number(localStorage.getItem("id"))
  );
  const updatedGameUsers = [selfPlayer, ...filteredGameUsers];

  switch (gameData.gameUsers.length) {
    case 4:
      return (
        <>
          <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
            <div className="flex justify-center">
              <GameVideoListItem
                player={updatedGameUsers[1]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[1]}
              />
            </div>
            <div className="flex justify-between">
              <GameVideoListItem
                player={updatedGameUsers[2]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[2]}
              />
              <GameVideoListItem
                player={updatedGameUsers[3]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[3]}
              />
            </div>
            <div className="flex justify-center">
              <GameVideoListItem
                player={updatedGameUsers[0]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[0]}
              />
            </div>
          </div>
        </>
      );

    case 5:
      return (
        <>
          <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
            <div className="flex justify-between">
              <GameVideoListItem
                player={updatedGameUsers[1]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[1]}
              />
              <GameVideoListItem
                player={updatedGameUsers[2]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[2]}
              />
            </div>
            <div className="flex justify-between">
              <GameVideoListItem
                player={updatedGameUsers[3]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[3]}
              />
              <GameVideoListItem
                player={updatedGameUsers[4]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[4]}
              />
            </div>
            <div className="flex justify-center">
              <GameVideoListItem
                player={updatedGameUsers[0]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[0]}
              />
            </div>
          </div>
        </>
      );

    default:
      return (
        <>
          <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
            <div className="flex justify-between">
              <GameVideoListItem
                player={updatedGameUsers[1]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[1]}
              />
              <GameVideoListItem
                player={updatedGameUsers[2]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[2]}
              />
              <GameVideoListItem
                player={updatedGameUsers[3]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[3]}
              />
            </div>
            <div className="flex justify-between">
              <GameVideoListItem
                player={updatedGameUsers[4]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[4]}
              />
              <GameVideoListItem
                player={updatedGameUsers[5]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[5]}
              />
            </div>
            <div className="flex justify-center">
              <GameVideoListItem
                player={updatedGameUsers[0]}
                curTurnPlayer={curTurnPlayer}
                video={streamManagers[0]}
              />
            </div>
          </div>
        </>
      );
  }
};

// export default memo(GameVideoList);
