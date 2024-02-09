import cardBack from "../../assets/image/game/cardBack.png";
import { useContext } from "react";
import { GameContext } from "./GameLogic";

export const GameHistoryCardListItem = ({ cards }) => {
  const { gameData } = useContext(GameContext);

  const cardStyleMap = [
    "-rotate-[30deg]",
    "-rotate-[15deg] -translate-y-[10px]",
    "-translate-y-[15px]",
    "rotate-[15deg] -translate-y-[10px]",
    "rotate-[30deg]",
  ];

  return (
    <>
      {cards.map((card, index) => (
        // NOTE : 카드 className text-black/0 추가하기 -> 텍스트 투명 설정
        <div
          style={{ backgroundImage: `url("${cardBack}")` }}
          className={`w-[50px] h-[80px] bg-cover bg-center -mx-[10px] z-10 ${cardStyleMap[index]}`}
          key={index}
        >
          {card}
        </div>
      ))}
    </>
  );
};
