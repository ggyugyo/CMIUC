import { memo } from "react";
import { GameVideoList } from "./GameVideoList";

export const GameVideo = ({ mainStreamManager, subscribers }) => {
  return (
    <>
      <GameVideoList
        mainStreamManager={mainStreamManager}
        subscribers={subscribers}
      />
    </>
  );
};

// export default memo(GameVideo);
