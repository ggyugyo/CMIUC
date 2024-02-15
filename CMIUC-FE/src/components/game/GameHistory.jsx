import { useState, useContext } from "react";
import { GameContext } from "./GameLogic";
import { GameHistoryCardList } from "./GameHistoryCardList.jsx";
import { GameMyCardListModal } from "../modals/GameMyCardListModal.jsx";

export const GameHistory = ({ modalState, setModalState }) => {
  const { gameData, setcheckMyCardsFlag } = useContext(GameContext);

  const _gameRoundHistory = gameData.gameAllRound.filter((history) => {
    return history.round < gameData.gamePlayDTO.curRound;
  });

  const checkMyCards = () => {
    setcheckMyCardsFlag((prev) => !prev);
  };

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
              <div className="top-[0px] transform -translate-y-1/2">
                {history.round} 라운드
              </div>
              <div className="w-[250px] h-[80px] flex justify-center items-center bottom-[0px]">
                <GameHistoryCardList cards={history.card} />
              </div>
            </div>
          );
        })}
      <button
        className="absolute top-[12px] left-[12px] bg-blue-500 text-white border border-gray-300 px-4 py-2 rounded-md transition duration-200 ease-in-out hover:border-gray-500 focus:outline-none"
        onClick={checkMyCards}
      >
        내 카드
      </button>
      {/* {checkMyCardsFlag === true && gameState === "DRAW_CARD" ? (
        <GameMyCardListModal
          modalState={modalState}
          setModalState={setModalState}
          setCheckMyCardsFlag={setCheckMyCardsFlag}
        />
      ) : null} */}
    </div>
  );
};
