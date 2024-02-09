import { GameHistoryCardListItem } from "./GameHistoryCardListItem.jsx";

export const GameHistoryCardList = ({ cards }) => {
  return (
    <div className="absolute">
      <GameHistoryCardListItem cards={cards} />
    </div>
  );
};
