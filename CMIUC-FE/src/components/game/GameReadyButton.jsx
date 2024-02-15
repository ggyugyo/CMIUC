import { useContext, useEffect } from "react";
import { GameContext } from "./GameLogic";
import { motion } from "framer-motion";
import { playSFX, SFX_LIST } from "../settings/SoundSetting";

export const GameReadyButton = ({ isReady }) => {
  const { readyOn, setReadyOn } = useContext(GameContext);
  const onClickHandler = () => {
    playSFX(SFX_LIST.EMPTY);
    setReadyOn((prev) => {
      // prev를 반전시켜 새로운 상태를 업데이트합니다.
      const newReadyOn = !prev;
      isReady(newReadyOn); // isReady 함수에 새로운 상태 전달
      return newReadyOn; // 새로운 상태 반환
    });
  };

  return (
    <div className="absolute z-10 top-[400px] flex justify-evenly items-center w-[600px] h-[200px]">
      {readyOn === false ? (
        <motion.button
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClickHandler}
          className="bg-blue-500 text-white font-bold py-7 px-10 rounded text-4xl hover:bg-blue-700"
        >
          준비하기
        </motion.button>
      ) : (
        <motion.button
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClickHandler}
          className="bg-gray-300 text-gray-500 font-bold py-7 px-10 rounded text-4xl hover:bg-gray-400"
        >
          준비완료
        </motion.button>
      )}
    </div>
  );
};
