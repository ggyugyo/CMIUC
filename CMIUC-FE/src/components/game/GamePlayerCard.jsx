import { GamePlayerCardList } from "./GamePlayerCardList.jsx";
import { useContext } from "react";
import { GameContext } from "./GameLogic.jsx";
import { PLAYER_CARD_MAP } from "../../map/game/PlayerCardMap.jsx";

export const GamePlayerCard = () => {
  const { playerInfo } = useContext(GameContext);
  const positionCard = PLAYER_CARD_MAP(playerInfo.length);
  return (
    <>
      {[...playerInfo].map((player, index) => (
        <GamePlayerCardList
          key={index}
          player={player}
          pos={positionCard[index]}
        />
      ))}
    </>
  );
};
