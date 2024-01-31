import { GameCardItem } from "./GameCardItem.jsx";

export const GameCardList = () => {
  // 인원수에 따라 카드 수가 달라짐
  // 해당사항 데이터 타입에 맞게 받아오기
  const cardDeck = [0, 0, 1, 0, 1, 0];
  return (
    <div className="flex gap-[20px] my-[20px]">
      {cardDeck.map((card, i) => (
        <GameCardItem key={i} card={card} />
      ))}
    </div>
  );
};
