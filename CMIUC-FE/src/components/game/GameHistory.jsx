import { useContext } from "react";
import { GameContext } from "./GameLogic";

export const GameHistory = () => {
  const { gameData } = useContext(GameContext);
  return (
    <div className="absolute bottom-[0px] right-[0px] flex flex-col justify-around items-center w-[650px] h-[250px] border-4 border-black">
      {gameData.gamePlayDTO.curRound > 1 && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">1라운드</div>
          <div className="flex justify-evenly w-[650px] h-[50px]">
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              치즈 : {gameData.gameAllRound[0].cheezeCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              쥐덫 : {gameData.gameAllRound[0].mousetrap}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              꽝 : {gameData.gameAllRound[0].normalCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              액션 : {gameData.gameAllRound[0].actionCnt}
            </div>
          </div>
        </div>
      )}
      {gameData.gamePlayDTO.curRound > 2 && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">2라운드</div>
          <div className="flex justify-evenly w-[650px] h-[50px]">
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              치즈 : {gameData.gameAllRound[1].cheezeCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              쥐덫 : {gameData.gameAllRound[1].mousetrap}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              꽝 : {gameData.gameAllRound[1].normalCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              액션 : {gameData.gameAllRound[1].actionCnt}
            </div>
          </div>
        </div>
      )}
      {gameData.gamePlayDTO.curRound > 3 && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">3라운드</div>
          <div className="flex justify-evenly w-[650px] h-[50px]">
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              치즈 : {gameData.gameAllRound[2].cheezeCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              쥐덫 : {gameData.gameAllRound[2].mousetrap}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              꽝 : {gameData.gameAllRound[2].normalCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              액션 : {gameData.gameAllRound[2].actionCnt}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
