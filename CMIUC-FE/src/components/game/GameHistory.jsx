import { useContext } from "react";
import { GameContext } from "./GameLogic";
import { GameHistoryCardList } from "./GameHistoryCardList.jsx";

export const GameHistory = () => {
  const { gameData } = useContext(GameContext);

  const _gameRoundHistory = gameData.gameAllRound.filter((history) => {
    return history.round < gameData.gamePlayDTO.curRound;
  });
  // console.log(_gameRoundHistory);

  return (
    <div className="absolute bottom-[0px] right-[0px] flex justify-around items-center w-[650px] h-[250px] border-4 border-black">
      {_gameRoundHistory.length !== 0 &&
        _gameRoundHistory.map((history, index) => {
          return (
            <div
              className="flex flex-col justify-around items-center w-[200px] h-[200px]"
              key={index}
            >
              <div className="top-[0px] transform -translate-y-1/2">
                {history.round} 라운드
              </div>
              <div className="w-[250px] h-[80px] flex justify-center items-center bottom-[0px]">
                <GameHistoryCardList cards={history.card} />
              </div>
            </div>
          );
        })}
    </div>
  );
};
