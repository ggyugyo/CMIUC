import { GamePlayerCardListItem } from "./GamePlayerCardListItem.jsx";

export const GamePlayerCardList = ({ player, pos }) => {
  const { cards } = player;
  const { memberId } = player;

  // 시연용 더미 데이터
  cards.sort((a, b) => a - b);

  return (
    <div className={pos}>
      <GamePlayerCardListItem cards={cards} memberId={memberId} />
    </div>
  );
};
