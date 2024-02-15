import lobby_sound from "../assets/sounds/lobby.mp3";

export const BGM_LIST = {
  LOBBY: lobby_sound,
};

export const SFX_LIST = {};

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
