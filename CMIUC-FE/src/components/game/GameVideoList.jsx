import { useContext, memo } from "react";
import { GameContext } from "./GameLogic";
import { GameVideoListItem } from "./GameVideoListItem";

export const GameVideoList = () => {
  const { playerInfo } = useContext(GameContext);

  switch (playerInfo.length) {
    case 4:
      return (
        <>
          <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
            <div className="flex justify-center">
              <GameVideoListItem player={playerInfo[1]} />
            </div>
            <div className="flex justify-between">
              <GameVideoListItem player={playerInfo[2]} />
              <GameVideoListItem player={playerInfo[3]} />
            </div>
            <div className="flex justify-center">
              <GameVideoListItem player={playerInfo[0]} />
            </div>
          </div>
        </>
      );

    case 5:
      return (
        <>
          <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
            <div className="flex justify-between">
              <GameVideoListItem player={playerInfo[1]} />
              <GameVideoListItem player={playerInfo[2]} />
            </div>
            <div className="flex justify-between">
              <GameVideoListItem player={playerInfo[3]} />
              <GameVideoListItem player={playerInfo[4]} />
            </div>
            <div className="flex justify-center">
              <GameVideoListItem player={playerInfo[0]} />
            </div>
          </div>
        </>
      );

    default:
      return (
        <>
          <div className="absolute bottom-[0px] w-[1800px] h-[800px] flex flex-col justify-between">
            <div className="flex justify-between">
              <GameVideoListItem player={playerInfo[1]} />
              <GameVideoListItem player={playerInfo[2]} />
              <GameVideoListItem player={playerInfo[3]} />
            </div>
            <div className="flex justify-between">
              <GameVideoListItem player={playerInfo[4]} />
              <GameVideoListItem player={playerInfo[5]} />
            </div>
            <div className="flex justify-center">
              <GameVideoListItem player={playerInfo[0]} />
            </div>
          </div>
        </>
      );
  }
};

// export default memo(GameVideoList);
