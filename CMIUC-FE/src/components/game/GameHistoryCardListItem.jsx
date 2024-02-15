import { useContext } from "react";
import { GameContext } from "./GameLogic";
import { CardImageMap } from "../../map/game/CardInfoMap";

export const GameHistoryCardListItem = ({ cards }) => {
  const { gameData } = useContext(GameContext);
  const userLength = gameData.gameUsers.length;

  const cardStyleMap = () => {
    switch (userLength) {
      case 6:
        return [
          "-rotate-[30deg]",
          "-rotate-[20deg] -translate-y-[10px]",
          "-rotate-[10deg] -translate-y-[15px]",
          "rotate-[10deg] -translate-y-[15px]",
          "rotate-[20deg] -translate-y-[10px]",
          "rotate-[30deg]",
        ];
      case 5:
        return [
          "-rotate-[30deg]",
          "-rotate-[15deg] -translate-y-[10px]",
          "-translate-y-[15px]",
          "rotate-[15deg] -translate-y-[10px]",
          "rotate-[30deg]",
        ];

      case 4:
        return [
          "-rotate-[30deg]",
          "-rotate-[15deg] -translate-y-[10px]",
          "rotate-[15deg] -translate-y-[10px]",
          "rotate-[30deg]",
        ];
    }
  };

  return (
    <>
      {cards.map((card, index) => (
        // NOTE : 카드 className text-black/0 추가하기 -> 텍스트 투명 설정
        <div
          style={{
            backgroundImage: `url("${CardImageMap(userLength, card)}")`,
            backgroundPosition: "center",
            borderRadius: "3px",
          }}
          className={`w-[50px] h-[80px] bg-cover bg-center -mx-[15px] z-10 rounded-md ${
            cardStyleMap()[index]
          }`}
          key={index}
        >
          {card}
        </div>
      ))}
    </>
  );
};
