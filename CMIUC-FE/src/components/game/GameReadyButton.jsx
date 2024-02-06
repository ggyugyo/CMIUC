import { useContext, useEffect } from "react";
import { GameContext } from "./GameLogic";

export const GameReadyButton = ({ memberReady }) => {
  const { readyOn, setReadyOn } = useContext(GameContext);
  const onClickHandler = () => {
    setReadyOn((prev) => {
      // prev를 반전시켜 새로운 상태를 업데이트합니다.
      const newReadyOn = !prev;
      memberReady(newReadyOn); // memberReady 함수에 새로운 상태 전달
      return newReadyOn; // 새로운 상태 반환
    });
  };

  return (
    <div className="absolute top-[400px] flex justify-evenly items-center w-[600px] h-[200px] border-4 border-black">
      {readyOn === false ? (
        <button
          onClick={onClickHandler}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          준비하기
        </button>
      ) : (
        <button
          onClick={onClickHandler}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          준비완료
        </button>
      )}
    </div>
  );
};
