import { GamePlayerCardList } from "./GamePlayerCardList.jsx";
import { useContext } from "react";
import { GameContext } from "./GameLogic.jsx";
import { PLAYER_CARD_MAP } from "../../map/game/PlayerCardMap.jsx";

export const GamePlayerCard = () => {
  const { gameData } = useContext(GameContext);
  const gameUsers = [...gameData.gameUsers].sort((a, b) => a.order - b.order);
  const selfPlayer = gameUsers.find(
    (player) => player.memberId === Number(localStorage.getItem("id"))
  );
  const filteredGameUsers = gameUsers.filter(
    (player) => player.memberId !== Number(localStorage.getItem("id"))
  );
  const updatedGameUsers = [selfPlayer, ...filteredGameUsers];
  const positionCard = PLAYER_CARD_MAP(gameUsers.length);
  return (
    <>
      {updatedGameUsers.map((player, index) => (
        <GamePlayerCardList
          key={index}
          player={player}
          pos={positionCard[index]}
        />
      ))}
    </>
  );
};
