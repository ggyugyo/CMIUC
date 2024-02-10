import { GameTableCardListItem } from "./GameTableCardListItem.jsx";
import { useContext, useEffect } from "react";
import { GameContext } from "./GameLogic.jsx";

export const GameTableCardList = () => {
  // 플레이어 인원수와 카드의 갯수가 같아지면 현재 테이블에 있는 카드를 roundCard에 저장한다.
  // 라운드를 1 증가시키면서, 라운드 모달을 띄운다.
  // 라운드 모달이 뜨고 나면 라운드 모달에서는 CARD_DEAL을 띄운다.
  const { gameData } = useContext(GameContext);

  // useEffect(() => {
  //   if (tableCard.length === playerInfo.length) {
  //     setRound(round + 1);
  //     setTableCard([]);
  //     setGameState("ROUND");
  //   }
  // }, [tableCard]);
  const tableCard = gameData.gamePlayDTO.tableCards;

  return (
    <div className="absolute top-[400px] flex justify-evenly items-center w-[600px] h-[200px] border-4 border-black">
      {
        // NOTE : 테이블 카드 배열을 맵핑하여 각각의 카드를 GameTableCardItem 컴포넌트로 전달
        tableCard.map((card, index) => (
          <div key={index}>
            <GameTableCardListItem card={card} />
          </div>
        ))
      }
    </div>
  );
};
