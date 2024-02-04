import { GamePlayerCardListItem } from "./GamePlayerCardListItem.jsx";

export const GamePlayerCardList = ({ player, pos }) => {
  const { userCard } = player;
  const { userID } = player;
  return (
    <div className={pos}>
      <GamePlayerCardListItem userCard={userCard} userID={userID} />
    </div>
  );
};
