import { useContext } from "react";
import { GameContext } from "./GameLogic";
import { CardImageMap } from "../../map/game/CardInfoMap";

export const GameMyCardListItem = ({ key, card }) => {
  const { gameData } = useContext(GameContext);
  const userLength = gameData.gameUsers.length;
  const cardImage = CardImageMap(userLength, card);
  return (
    <>
      {/* NOTE : 카드 className text-black/0 추가하기 -> 텍스트 투명 설정 */}
      <div
        style={{
          backgroundImage: `url("${cardImage}")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-[70px] h-[115px] bg-cover bg-center"
      >
        {card}
      </div>
    </>
  );
};
