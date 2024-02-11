import { useState, useContext, memo, useEffect } from "react";
import { GameContext } from "./GameLogic";
import { GameVideoListItem } from "./GameVideoListItem";

export const GameVideoList = ({ mainStreamManager, subscribers }) => {
  const { gameState, gameData } = useContext(GameContext);
  const [streamManagers, setStreamManagers] = useState([undefined]);

  const onStreamManagers = (idx, stream) => {
    setStreamManagers((prevSMs) => {
      let newSMs = [...prevSMs];
      while (newSMs.length <= idx) {
        newSMs.push(undefined);
      }
      newSMs[idx] = stream;
      return newSMs;
    });
  };

  useEffect(() => {
    subscribers.forEach(function (sub) {
      console.log("OVEN1", sub);
      if (sub?.stream?.connection?.data !== undefined) {
        let userData = JSON.parse(sub.stream.connection.data);
        let userName = userData.clientData;
        gameData.gameUsers.forEach(function (user, index) {
          if (user.nickname === userName) {
            onStreamManagers(index, sub);
          }
          console.log("OVEN2", mainStreamManager);
          if (mainStreamManager?.stream?.connection?.data !== undefined) {
            let myData = JSON.parse(mainStreamManager.stream.connection.data);
            let myName = myData.clientData;
            if (user.nickname === myName) {
              onStreamManagers(index, mainStreamManager);
            }
          }
        });
      }
    });
  }, [subscribers]);

  useEffect(() => {
    console.log("OVEN3", mainStreamManager);
    gameData.gameUsers.forEach(function (user, index) {
      if (mainStreamManager?.stream?.connection?.data !== undefined) {
        let myData = JSON.parse(mainStreamManager.stream.connection.data);
        let myName = myData.clientData;
        if (user.nickname === myName) {
          onStreamManagers(index, mainStreamManager);
        }
      }
    });
  }, [mainStreamManager]);

  // console.log("StreamManagers", streamManagers);

  let curTurnPlayer = undefined;
  // 나를 먼저 빼고 하단에 고정시키고, 나머지 소팅해서 화면에 고정시키기
  if (gameState === "DRAW_CARD" && gameData?.gamePlayDTO?.curTurn !== 0) {
    curTurnPlayer = [...gameData.gameUsers].find(
      (player) => player.memberId === gameData?.gamePlayDTO?.curTurn
    );
  }

  if (gameState === "WAIT") {
    const gameUsers = [...gameData.gameUsers].sort((a, b) => a.order - b.order);
    const selfPlayer = gameUsers.find(
      (player) => player.memberId === Number(localStorage.getItem("id"))
    );
    // console.log("selfPlayer", selfPlayer);
    const filteredGameUsers = gameUsers.filter(
      (player) => player.memberId !== Number(localStorage.getItem("id"))
    );
    const updatedGameUsers = [selfPlayer, ...filteredGameUsers];
    // console.log("updatedGameUsers", updatedGameUsers);

    switch (gameData.gameUsers.length) {
      case 4:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[1]}
                  video={streamManagers[1]}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={updatedGameUsers[2]}
                  video={streamManagers[2]}
                />
                <GameVideoListItem
                  player={updatedGameUsers[3]}
                  video={streamManagers[3]}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[0]}
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
                  video={streamManagers[1]}
                />
                <GameVideoListItem
                  player={updatedGameUsers[2]}
                  video={streamManagers[2]}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={updatedGameUsers[3]}
                  video={streamManagers[3]}
                />
                <GameVideoListItem
                  player={updatedGameUsers[4]}
                  video={streamManagers[4]}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[0]}
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
                  video={streamManagers[1]}
                />
                <GameVideoListItem
                  player={updatedGameUsers[2]}
                  video={streamManagers[2]}
                />
                <GameVideoListItem
                  player={updatedGameUsers[3]}
                  video={streamManagers[3]}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={updatedGameUsers[4]}
                  video={streamManagers[4]}
                />
                <GameVideoListItem
                  player={updatedGameUsers[5]}
                  video={streamManagers[5]}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[0]}
                  video={streamManagers[0]}
                />
              </div>
            </div>
          </>
        );
    }
  } else {
    const gameUsers = [...gameData.gameUsers].sort((a, b) => a.order - b.order);
    const selfPlayer = gameUsers.find(
      (player) => player.memberId === Number(localStorage.getItem("id"))
    );
    // console.log("selfPlayer", selfPlayer);
    const filteredGameUsers = gameUsers.filter(
      (player) => player.memberId !== Number(localStorage.getItem("id"))
    );
    const updatedGameUsers = [selfPlayer, ...filteredGameUsers];
    // console.log("updatedGameUsers", updatedGameUsers);
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
  }
};

// export default memo(GameVideoList);
