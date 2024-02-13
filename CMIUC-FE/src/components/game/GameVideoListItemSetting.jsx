import React, { useRef, useEffect, useContext } from "react";
import { GameContext } from "./GameLogic";
import { ViduContext } from "../../pages/Game";

export const GameVideoListItemSetting = ({ streamManager, selfVideo }) => {
  const { gameData } = useContext(GameContext);
  const { mainStreamManager, setSelfMic } = useContext(ViduContext);

  const videoRef = useRef();

  const muteUser = [...gameData.gameUsers].find((user) => {
    if (user.cards.includes(1)) {
      return user;
    }
  });

  if (mainStreamManager?.stream?.connection?.data !== undefined) {
    let selfData = JSON.parse(mainStreamManager.stream.connection.data);
    let selfName = selfData.clientData;
    if (muteUser.nickname === selfName) {
      setSelfMic(false);
    }
  }

  useEffect(() => {
    if (streamManager !== undefined && streamManager && !!videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <video
      autoPlay={true}
      ref={videoRef}
      muted={selfVideo ? true : false}
      id={selfVideo ? "self" : "other"}
    />
  );
};
