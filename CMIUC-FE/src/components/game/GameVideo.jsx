import { memo } from "react";
import { GameVideoList } from "./GameVideoList";

export const GameVideo = ({
  mainStreamManager,
  subscribers,
  setSelfCamera,
  setSelfMic,
  setUserVideo,
  setUserAudio,
}) => {
  return (
    <>
      <GameVideoList
        mainStreamManager={mainStreamManager}
        subscribers={subscribers}
        setSelfCamera={setSelfCamera}
        setSelfMic={setSelfMic}
        setUserVideo={setUserVideo}
        setUserAudio={setUserAudio}
      />
    </>
  );
};

// export default memo(GameVideo);
