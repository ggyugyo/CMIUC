import { useState, useContext } from "react";
import { GameContext } from "./GameLogic";
import { GameHistoryCardList } from "./GameHistoryCardList.jsx";

export const GameHistory = () => {
  const { gameData } = useContext(GameContext);

  const _gameRoundHistory = gameData.gameAllRound.filter((history) => {
    return history.round < gameData.gamePlayDTO.curRound;
  });

  _gameRoundHistory.sort((a, b) => a.round - b.round);

  return (
    <div className="absolute bottom-[0px] right-[0px] flex justify-around items-center w-[650px] h-[250px] bg-gray-100 rounded-tl-lg rounded-tr-lg rounded-bl-lg opacity-70 transition duration-700">
      {_gameRoundHistory.length !== 0 &&
        _gameRoundHistory.map((history, index) => {
          return (
            <div
              className="flex flex-col justify-around items-center w-[200px] h-[200px]"
              key={index}
            >
              <div className="top-[0px] transform -translate-y-1/2 text-base">
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
