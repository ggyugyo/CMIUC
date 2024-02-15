import action_1 from "../../assets/image/game/action1.png";
import action_2 from "../../assets/image/game/action2.png";
import action_3 from "../../assets/image/game/action3.png";
import action_4 from "../../assets/image/game/action4.png";
import action_5 from "../../assets/image/game/action5.png";
import action_6 from "../../assets/image/game/action6.png";
import cheeseCard from "../../assets/image/game/cheeseCard.png";
import emptyCard from "../../assets/image/game/emptyCard.png";
import trapCard from "../../assets/image/game/trapCard.png";

export const CardInfoMap = (number) => {
  switch (number) {
    case 4:
      return {
        치즈: [8, 9, 10, 11],
        쥐덫: [7],
        꽝: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
        액션: [1, 2, 3, 4, 5, 6],
      };
    case 5:
      return {
        치즈: [8, 9, 10, 11, 12],
        쥐덫: [7],
        꽝: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
        액션: [1, 2, 3, 4, 5, 6],
      };
    default:
      return {
        치즈: [8, 9, 10, 11, 12, 13],
        쥐덫: [7],
        꽝: [
          14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
          31,
        ],
        액션: [1, 2, 3, 4, 5, 6],
      };
  }
};

export const CardImageMap = (userLength, cardValue) => {
  switch (userLength) {
    case 4:
      if (cardValue === 1) {
        return action_1;
      } else if (cardValue === 2) {
        return action_2;
      } else if (cardValue === 3) {
        return action_3;
      } else if (cardValue === 4) {
        return action_4;
      } else if (cardValue === 5) {
        return action_5;
      } else if (cardValue === 6) {
        return action_6;
      } else if (cardValue === 7) {
        return trapCard;
      } else if (cardValue >= 8 && cardValue <= 11) {
        return cheeseCard;
      } else {
        return emptyCard;
      }

    case 5:
      if (cardValue === 1) {
        return action_1;
      } else if (cardValue === 2) {
        return action_2;
      } else if (cardValue === 3) {
        return action_3;
      } else if (cardValue === 4) {
        return action_4;
      } else if (cardValue === 5) {
        return action_5;
      } else if (cardValue === 6) {
        return action_6;
      } else if (cardValue === 7) {
        return trapCard;
      } else if (cardValue >= 8 && cardValue <= 12) {
        return cheeseCard;
      } else {
        return emptyCard;
      }

    case 6:
      if (cardValue === 1) {
        return action_1;
      } else if (cardValue === 2) {
        return action_2;
      } else if (cardValue === 3) {
        return action_3;
      } else if (cardValue === 4) {
        return action_4;
      } else if (cardValue === 5) {
        return action_5;
      } else if (cardValue === 6) {
        return action_6;
      } else if (cardValue === 7) {
        return trapCard;
      } else if (cardValue >= 8 && cardValue <= 13) {
        return cheeseCard;
      } else {
        return emptyCard;
      }
  }
};
