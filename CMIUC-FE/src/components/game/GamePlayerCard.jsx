import { GamePlayerCardList } from "./GamePlayerCardList.jsx";
import { useContext } from "react";
import { GameContext } from "./GameLogic.jsx";
import { PLAYER_CARD_MAP } from "../../map/game/PlayerCardMap.jsx";

export const GamePlayerCard = () => {
  const { playerInfo } = useContext(GameContext);
  const positionCard = PLAYER_CARD_MAP(playerInfo.length);
  return (
    <>
      {/* 여기 전체를 묶어서 고정시키는 방법 생각해보기 */}
      {[...playerInfo].map((player, index) => (
        <GamePlayerCardList
          key={index}
          player={player}
          pos={positionCard[index]}
        />
        // </div>
      ))}
    </>
  );
};
