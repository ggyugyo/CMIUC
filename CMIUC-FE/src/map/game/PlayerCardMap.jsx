export const PLAYER_CARD_MAP = (playerNumber) => {
  switch (playerNumber) {
    case 4:
      return [
        `absolute w-[250px] h-[80px] flex top-[620px] justify-center`,
        `absolute w-[250px] h-[80px] flex top-[300px] justify-center rotate-180`,
        `absolute w-[250px] h-[80px] flex top-[460px] left-[265px] rotate-90`,
        `absolute w-[250px] h-[80px] flex top-[460px] right-[265px] rotate-[270deg]`,
      ];
    case 5:
      return [
        `absolute w-[250px] h-[80px] flex top-[620px] justify-center`,
        `absolute w-[250px] h-[80px] flex top-[160px] left-[265px] rotate-90`,
        `absolute w-[250px] h-[80px] flex top-[160px] right-[265px] rotate-[270deg]`,
        `absolute w-[250px] h-[80px] flex top-[460px] left-[265px] rotate-90`,
        `absolute w-[250px] h-[80px] flex top-[460px] right-[265px] rotate-[270deg]`,
      ];

    default:
      return [
        `absolute w-[250px] h-[80px] flex top-[620px] justify-center`,
        `absolute w-[250px] h-[80px] flex top-[160px] left-[265px] rotate-90 justify-center`,
        `absolute w-[250px] h-[80px] flex top-[300px] justify-center rotate-180 justify-center`,
        `absolute w-[250px] h-[80px] flex top-[160px] right-[265px] rotate-[270deg] justify-center`,
        `absolute w-[250px] h-[80px] flex top-[460px] left-[265px] rotate-90 justify-center`,
        `absolute w-[250px] h-[80px] flex top-[460px] right-[265px] rotate-[270deg] justify-center`,
      ];
  }
};
