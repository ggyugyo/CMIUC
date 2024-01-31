import { memo } from "react";
import { GameVideoList } from "./GameVideoList";

export const GameVideo = ({ playerInfo }) => {
  return (
    <div>
      <GameVideoList playerInfo={playerInfo} />
    </div>
  );
};

// export default memo(GameVideo);
