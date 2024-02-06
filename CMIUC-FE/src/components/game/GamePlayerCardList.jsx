import { GamePlayerCardListItem } from "./GamePlayerCardListItem.jsx";

export const GamePlayerCardList = ({ player, pos }) => {
  const { cards } = player;
  const { memberId } = player;
  return (
    <div className={pos}>
      <GamePlayerCardListItem cards={cards} memberId={memberId} />
    </div>
  );
};
