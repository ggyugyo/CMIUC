import { useContext, useState } from "react";
import { GameContext } from "./GameLogic";
import { ViduContext } from "../../pages/Game";
import { Link } from "react-router-dom";
import InGameModal from "../modals/InGameModal";
import exitIcon from "../../assets/img/exitIcon.png";
import cheese from "../../assets/img/cheesePlate.png";
import trap from "../../assets/img/trap.png";
import empty from "../../assets/img/empty.png";
import actionIcon from "../../assets/img/actionIcon.png";

export const GameBoard = ({ unSubRoom, leaveSession }) => {
  const { gameState, gameData } = useContext(GameContext);
  const { _roomName } = useContext(ViduContext);

  const onClickHandler = () => {
    leaveSession();
    unSubRoom();
  };

  const [isInGameModalOpen, setIsInGameModalOpen] = useState(false);

  const openModal = () => {
    setIsInGameModalOpen(true);
  };

  const closeModal = () => {
    setIsInGameModalOpen(false);
  };
  return (
    <div className="absolute inset-x-0 top-0 flex justify-between h-18 shadow-lg bg-yellow-100 bg-opacity-70">
      <div className="flex flex-col items-center">
        {/* <div className="flex justify-center items-center w-[350px] h-[40px] border-4 border-black">
          타이머
        </div>
        <div className="flex justify-center items-center w-[350px] h-[60px] border-4 border-black">
          {timer}
        </div> */}
        {/* 버튼 클릭 이벤트 핸들러 등록 */}
        {/* <div
          className="flex flex-col justify-center items-center w-[200px] h-[1000px]"
          onClick={onClickHandler}
        >
          <div className="flex flex-col justify-center hover:border-sky-400 text-[24px] w-[120px] h-[60px] text-center border-black border-[8px] text-blue-400 duration-500 transition-colors">
            <Link to="/lobby" className="text-center text-blue-400">
              방나가기
            </Link>
          </div>
        </div> */}
      </div>
      {gameState === "DRAW_CARD" && (
        <div className="flex flex-col items-center w-[1200px]">
          <div className="flex justify-center items-center w-[1200px] h-[40px] ">
            게임 상황판
          </div>
          <div className="flex justify-evenly w-[1200px] h-[60px]">
            <div className="flex justify-center items-center w-[400px]">
              <img src={cheese} className="w-10 h-auto" />{" "}
              {gameData.gamePlayDTO.cheezeCnt}
            </div>
            <div className="flex justify-center items-center w-[400px]">
              <img src={trap} className="w-12 h-auto p-2" />{" "}
              {gameData.gamePlayDTO.mousetrap}
            </div>
            <div className="flex justify-center items-center w-[400px]">
              <img src={empty} className="w-10 h-auto" />{" "}
              {gameData.gamePlayDTO.normalCnt}
            </div>
            <div className="flex justify-center items-center w-[400px]">
              <img
                src={actionIcon}
                className="w-10 h-auto p-2"
                onClick={openModal}
              />{" "}
              {gameData.gamePlayDTO.actionCnt}
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

      <div className="flex items-center justify-center text-[24px] text-center duration-500 transition-colors">
        <Link to="/lobby" className="text-center">
          <img src={exitIcon} className="w-20 h-20 mt-6 ml-10" onClick={onClickHandler} />
        </Link>
      </div>

      {/* 인게임에서 액션 카드 정보 */}
      <InGameModal />
    </div>
  );
};
