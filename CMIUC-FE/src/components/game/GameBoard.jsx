import { useContext } from "react";
import { GameContext } from "./GameLogic";
import { ViduContext } from "../../pages/Game";
import { Link } from "react-router-dom";

export const GameBoard = ({ unSubRoom, leaveSession }) => {
  const { gameState, gameData } = useContext(GameContext);
  const { _roomName } = useContext(ViduContext);

  const onClickHandler = () => {
    leaveSession();
    unSubRoom();
  };

  return (
    <div className="absolute flex justify-between w-[1900px] h-[100px] top-[0px] border-4 border-black">
      <div className="flex flex-col items-center w-[350px]">
        {/* <div className="flex justify-center items-center w-[350px] h-[40px] border-4 border-black">
          타이머
        </div>
        <div className="flex justify-center items-center w-[350px] h-[60px] border-4 border-black">
          {timer}
        </div> */}
        {/* 버튼 클릭 이벤트 핸들러 등록 */}
        <div
          className="flex flex-col justify-center items-center w-[200px] h-[1000px]"
          onClick={onClickHandler}
        >
          <div className="flex flex-col justify-center hover:border-sky-400 text-[24px] w-[120px] h-[60px] text-center border-black border-[8px] text-blue-400 duration-500 transition-colors">
            <Link to="/lobby" className="text-center text-blue-400">
              방나가기
            </Link>
          </div>
        </div>
      </div>
      {gameState === "DRAW_CARD" && (
        <div className="flex flex-col items-center w-[1200px]">
          <div className="flex justify-center items-center w-[1200px] h-[40px] border-4 border-black">
            게임 상황판
          </div>
          <div className="flex justify-evenly w-[1200px] h-[60px]">
            <div className="flex justify-center items-center w-[400px] border-4 border-black">
              치즈 : {gameData.gamePlayDTO.cheezeCnt}
            </div>
            <div className="flex justify-center items-center w-[400px] border-4 border-black">
              쥐덫 : {gameData.gamePlayDTO.mousetrap}
            </div>
            <div className="flex justify-center items-center w-[400px] border-4 border-black">
              꽝 : {gameData.gamePlayDTO.normalCnt}
            </div>
            <div className="flex justify-center items-center w-[400px] border-4 border-black">
              액션 : {gameData.gamePlayDTO.actionCnt}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center w-[350px]">
        <div className="flex justify-center items-center w-[350px] h-[40px] border-4 border-black">
          방 이름
        </div>
        <div className="flex justify-center items-center w-[350px] h-[60px] border-4 border-black">
          {_roomName}
        </div>
      </div>
    </div>
  );
};
