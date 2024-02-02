import { GameTableCardListItem } from "./GameTableCardListItem.jsx";
import { useContext } from "react";
import { GameContext } from "./GameLogic.jsx";

export const GameTableCardList = () => {
  const { tableCard } = useContext(GameContext);
  return (
    <div className="absolute top-[400px] flex justify-evenly items-center w-[600px] h-[200px] border-4 border-black">
      {
        // NOTE : 테이블 카드 배열을 맵핑하여 각각의 카드를 GameTableCardItem 컴포넌트로 전달
        tableCard.map((card, index) => (
          <div className="" key={index}>
            <GameTableCardListItem card={card} />
          </div>
        ))
      }
    </div>
  );
};
