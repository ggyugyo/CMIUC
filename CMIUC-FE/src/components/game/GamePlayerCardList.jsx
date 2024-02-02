import { GamePlayerCardItem } from "./GamePlayerCardListItem.jsx";

export const GamePlayerCardList = ({ player, pos }) => {
  const { userCard } = player;
  const { userID } = player;
  return (
    <div className={pos}>
      <GamePlayerCardItem userCard={userCard} userID={userID} />
    </div>
  );
};
