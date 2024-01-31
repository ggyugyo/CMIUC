import { GameCardList } from "./GameCardList.jsx";

export const GameCard = () => {
  return (
    <div className="flex flex-col border-4 border-black flex w-[1400px] items-center">
      <div className="text-[30px]">카드리스트</div>
      <div className="text-[20px]">타이머</div>
      <div>{123}</div>

      <div>{<GameCardList />}</div>
    </div>
  );
};
