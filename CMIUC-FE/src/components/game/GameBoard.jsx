import { useContext, useState } from "react";
import { GameContext } from "./GameLogic";
import { Link } from "react-router-dom";
import InGameModal from "../modals/InGameModal";
import exitIcon from "../../assets/img/exitIcon.png";
import cheese from "../../assets/img/cheesePlate.png";
import trap from "../../assets/img/trap.png";
import empty from "../../assets/img/empty.png";
import actionIcon from "../../assets/img/actionIcon.png";

export const GameBoard = ({ exit }) => {
  const { gameState, gameData } = useContext(GameContext);
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
      {/* <div className="flex flex-col items-center w-[350px]">
        <div className="flex justify-center items-center w-[350px] h-[40px] border-4 border-black">
          설정
        </div>
        <div className="flex justify-center items-center w-[350px] h-[60px] border-4 border-black">
          설정 버튼
        </div>
      </div> */}

      <div className="flex items-center justify-center text-[24px] text-center duration-500 transition-colors">
        <Link to="/lobby" className="text-center">
          <img src={exitIcon} className="w-20 h-20 mt-6 ml-10" />
        </Link>
      </div>

      {/* 인게임에서 액션 카드 정보 */}
      <InGameModal />
    </div>
  );
};
