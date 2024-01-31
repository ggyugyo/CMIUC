import { useContext, memo } from "react";
import { UserContext } from "./GameLogic";
import { GameVideoListItem } from "./GameVideoListItem";

export const GameVideoList = () => {
  const { playerInfo } = useContext(UserContext);

  switch (playerInfo.length) {
    case 4:
      return (
        <>
          <div>
            <GameVideoListItem player={playerInfo[0]} />
            <GameVideoListItem player={playerInfo[1]} />
          </div>
          <div>
            <GameVideoListItem player={playerInfo[2]} />
            <GameVideoListItem player={playerInfo[3]} />
          </div>
        </>
      );

    case 5:
      return (
        <>
          <div>
            <GameVideoListItem player={playerInfo[0]} />
            <GameVideoListItem player={playerInfo[1]} />
          </div>
          <div>
            <GameVideoListItem player={playerInfo[2]} />
            <GameVideoListItem player={playerInfo[3]} />
          </div>
          <div>
            <GameVideoListItem player={playerInfo[4]} />
          </div>
        </>
      );

    default:
      return (
        <>
          <div>
            <GameVideoListItem player={playerInfo[1]} />
            <GameVideoListItem player={playerInfo[2]} />
            <GameVideoListItem player={playerInfo[3]} />
          </div>
          <div>
            <GameVideoListItem player={playerInfo[4]} />
            <GameVideoListItem player={playerInfo[5]} />
          </div>
          <div>
            <GameVideoListItem player={playerInfo[0]} />
          </div>
        </>
      );
  }
};

// export default memo(GameVideoList);
