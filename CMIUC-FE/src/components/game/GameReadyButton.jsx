import { useContext, useEffect } from "react";
import { GameContext } from "./GameLogic";
import { motion } from "framer-motion";

export const GameReadyButton = ({ isReady }) => {
  const { readyOn, setReadyOn } = useContext(GameContext);
  const onClickHandler = () => {
    setReadyOn((prev) => {
      // prev를 반전시켜 새로운 상태를 업데이트합니다.
      const newReadyOn = !prev;
      isReady(newReadyOn); // isReady 함수에 새로운 상태 전달
      return newReadyOn; // 새로운 상태 반환
    });
  };

  return (
    <div className="absolute z-10 top-[400px] flex justify-evenly items-center w-[600px] h-[200px] border-4 border-black">
      {readyOn === false ? (
        <motion.button
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClickHandler}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          준비하기
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClickHandler}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          준비완료
        </motion.button>
      )}
    </div>
  );
};
