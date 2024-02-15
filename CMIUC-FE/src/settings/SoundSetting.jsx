import { useEffect } from "react";
import lobby_sound from "../assets/sounds/lobby.mp3";
import game_sound from "../assets/sounds/game.mp3";
import cheezeSound from "../assets/sounds/cheezeSound.mp3";
import actionSound from "../assets/sounds/actionSound.mp3";
import emptySound from "../assets/sounds/emptySound.mp3";
import game_end from "../assets/sounds/gameEnd.mp3";

export const BGM_LIST = {
  LOBBY: lobby_sound,
  GAME: game_sound,
};

export const SFX_LIST = {
  CHEEZE: cheezeSound,
  ACTION: actionSound,
  EMPTY: emptySound,
  GAME_END: game_end,
};

export const playBGM = (src) => {
  useEffect(() => {
    let bgm;

    bgm = createBGMInstance(src);

    return () => {
      bgm.pause();
      bgm.src = "";
    };
  }, []);
};

export const createBGMInstance = (src) => {
  const bgm = new Audio(src);

  bgm.autoplay = true;
  bgm.loop = true;

  bgm.play().catch((error) => {
    console.error("BGM 에러:", error);
  });

  return bgm;
};

export const playSFX = (src) => {
  const sfx = new Audio(src);

  console.log("SFXSRC: ", src);

  sfx.play().catch((error) => {
    console.error("SFX 에러:", error);
  });
};
