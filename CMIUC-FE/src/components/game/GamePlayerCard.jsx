import { GamePlayerCardList } from "./GamePlayerCardList.jsx";
import { useContext } from "react";
import { GameContext } from "./GameLogic.jsx";
import { PLAYER_CARD_MAP } from "../../map/game/PlayerCardMap.jsx";

export const GamePlayerCard = () => {
  const { gameData } = useContext(GameContext);
  const gameUsers = [...gameData.gameUsers].sort(
    (a, b) => a.memberId - b.memberId
  );
  const positionCard = PLAYER_CARD_MAP(gameUsers.length);
  return (
    <>
      {gameUsers.map((player, index) => (
        <GamePlayerCardList
          key={index}
          player={player}
          pos={positionCard[index]}
        />
      ))}
    </>
  );
};
