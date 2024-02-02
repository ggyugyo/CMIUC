export const PLAYER_CARD_MAP = (playerNumber) => {
  switch (playerNumber) {
    case 4:
      return [
        `absolute flex top-[620px] justify-center`,
        `absolute flex top-[300px] justify-center rotate-180`,
        `absolute flex top-[460px] left-[265px] rotate-90`,
        `absolute flex top-[460px] right-[265px] rotate-[270deg]`,
      ];
    case 5:
      return [
        `absolute flex top-[620px] justify-center`,
        `absolute flex top-[160px] left-[265px] rotate-90`,
        `absolute flex top-[160px] right-[265px] rotate-[270deg]`,
        `absolute flex top-[460px] left-[265px] rotate-90`,
        `absolute flex top-[460px] right-[265px] rotate-[270deg]`,
      ];

    default:
      return [
        `absolute flex top-[620px] justify-center`,
        `absolute flex top-[160px] left-[265px] rotate-90`,
        `absolute flex top-[300px] justify-center rotate-180`,
        `absolute flex top-[160px] right-[265px] rotate-[270deg]`,
        `absolute flex top-[460px] left-[265px] rotate-90`,
        `absolute flex top-[460px] right-[265px] rotate-[270deg]`,
      ];
  }
};
