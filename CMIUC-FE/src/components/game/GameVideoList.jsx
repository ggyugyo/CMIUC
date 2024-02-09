import { useContext, memo, useEffect } from "react";
import { GameContext } from "./GameLogic";
import { GameVideoListItem } from "./GameVideoListItem";

export const GameVideoList = () => {
  const { gameState, gameData } = useContext(GameContext);

  let curTurnPlayer = undefined;

  if (gameState === "DRAW_CARD" && gameData.gamePlayDTO.curTurn !== 0) {
    curTurnPlayer = [...gameData.gameUsers].find(
      (player) => player.memberId === gameData.gamePlayDTO.curTurn
    );
  }

  if (gameState === "WAIT") {
    const roomUsers = [...gameData.roomUsers].sort(
      (a, b) => a.memberId - b.memberId
    );
    switch (gameData.roomUsers.length) {
      case 4:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-center">
                <GameVideoListItem player={roomUsers[1]} />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem player={roomUsers[2]} />
                <GameVideoListItem player={roomUsers[3]} />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem player={roomUsers[0]} />
              </div>
            </div>
          </>
        );

      case 5:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-between">
                <GameVideoListItem player={roomUsers[1]} />
                <GameVideoListItem player={roomUsers[2]} />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem player={roomUsers[3]} />
                <GameVideoListItem player={roomUsers[4]} />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem player={roomUsers[0]} />
              </div>
            </div>
          </>
        );

      default:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-between">
                <GameVideoListItem player={roomUsers[1]} />
                <GameVideoListItem player={roomUsers[2]} />
                <GameVideoListItem player={roomUsers[3]} />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem player={roomUsers[4]} />
                <GameVideoListItem player={roomUsers[5]} />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem player={roomUsers[0]} />
              </div>
            </div>
          </>
        );
    }
  } else {
    const gameUsers = [...gameData.gameUsers].sort(
      (a, b) => a.memberId - b.memberId
    );
    switch (gameData.gameUsers.length) {
      case 4:
        return (
          <>
            <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
              <div className="flex justify-center">
                <GameVideoListItem
                  player={gameUsers[1]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={gameUsers[2]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={gameUsers[3]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={gameUsers[0]}
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
                  player={gameUsers[1]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={gameUsers[2]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={gameUsers[3]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={gameUsers[4]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={gameUsers[0]}
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
                  player={gameUsers[1]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={gameUsers[2]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={gameUsers[3]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-between">
                <GameVideoListItem
                  player={gameUsers[4]}
                  curTurnPlayer={curTurnPlayer}
                />
                <GameVideoListItem
                  player={gameUsers[5]}
                  curTurnPlayer={curTurnPlayer}
                />
              </div>
              <div className="flex justify-center">
                <GameVideoListItem
                  player={gameUsers[0]}
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
