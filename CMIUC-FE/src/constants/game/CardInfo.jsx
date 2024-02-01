export const CardInfo = (number) => {
  switch (number) {
    case 4:
      return {
        CHEESE: [1, 2, 3, 4],
        TRAP: 5,
        EMPTY: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        ACTION: [16, 17, 18, 19, 20, 21],
      };
    case 5:
      return {
        CHEESE: [1, 2, 3, 4, 5],
        TRAP: 6,
        EMPTY: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        ACTION: [21, 22, 23, 24, 25, 26],
      };
    default:
      return {
        CHEESE: [1, 2, 3, 4, 5, 6],
        TRAP: 7,
        EMPTY: [
          8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
        ],
        ACTION: [26, 27, 28, 29, 30, 31],
      };
  }
};
