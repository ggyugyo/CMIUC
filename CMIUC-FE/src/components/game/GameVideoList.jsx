import { useContext, memo, useEffect } from "react";
import { GameContext } from "./GameLogic";
import { GameVideoListItem } from "./GameVideoListItem";

export const GameVideoList = () => {
  const { gameState, gameData } = useContext(GameContext);

  let curTurnPlayer = undefined;
  // 나를 먼저 빼고 하단에 고정시키고, 나머지 소팅해서 화면에 고정시키기
  if (gameState === "DRAW_CARD" && gameData.gamePlayDTO.curTurn !== 0) {
    curTurnPlayer = [...gameData.gameUsers].find(
      (player) => player.memberId === gameData.gamePlayDTO.curTurn
    );
  }

  if (gameState === "WAIT") {
    const roomUsers = [...gameData.roomUsers].sort((a, b) => a.order - b.order);
    const selfPlayer = roomUsers.find(
      (player) => player.memberId === Number(localStorage.getItem("id"))
    );
    console.log("selfPlayer", selfPlayer);
    const filteredRoomUsers = roomUsers.filter(
      (player) => player.memberId !== Number(localStorage.getItem("id"))
    );
    const updatedRoomUsers = [selfPlayer, ...filteredRoomUsers];
    console.log("updatedRoomUsers", updatedRoomUsers);

    switch (gameData.roomUsers.length) {
      case 4:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-center">
                <GameVideoListItem player={updatedRoomUsers[1]} />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem player={updatedRoomUsers[2]} />
                <GameVideoListItem player={updatedRoomUsers[3]} />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem player={updatedRoomUsers[0]} />
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-between">
                <GameVideoListItem player={updatedRoomUsers[1]} />
                <GameVideoListItem player={updatedRoomUsers[2]} />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem player={updatedRoomUsers[3]} />
                <GameVideoListItem player={updatedRoomUsers[4]} />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem player={updatedRoomUsers[0]} />
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-between">
                <GameVideoListItem player={updatedRoomUsers[1]} />
                <GameVideoListItem player={updatedRoomUsers[2]} />
                <GameVideoListItem player={updatedRoomUsers[3]} />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem player={updatedRoomUsers[4]} />
                <GameVideoListItem player={updatedRoomUsers[5]} />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem player={updatedRoomUsers[0]} />
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
    console.log("selfPlayer", selfPlayer);
    const filteredGameUsers = gameUsers.filter(
      (player) => player.memberId !== Number(localStorage.getItem("id"))
    );
    const updatedGameUsers = [selfPlayer, ...filteredGameUsers];
    console.log("updatedGameUsers", updatedGameUsers);
    switch (gameData.gameUsers.length) {
      case 4:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[1]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={updatedGameUsers[2]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={updatedGameUsers[3]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[0]}
                  curTurnPlayer={curTurnPlayer}
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
                />
                <GameVideoListItem
                  player={updatedGameUsers[2]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={updatedGameUsers[3]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={updatedGameUsers[4]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[0]}
                  curTurnPlayer={curTurnPlayer}
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
                />
                <GameVideoListItem
                  player={updatedGameUsers[2]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={updatedGameUsers[3]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={updatedGameUsers[4]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={updatedGameUsers[5]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={updatedGameUsers[0]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
            </div>
          </>
        );
    }
  }
};

// export default memo(GameVideoList);
