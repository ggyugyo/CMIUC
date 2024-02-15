import { useContext, useState } from "react";
import { GameContext } from "./GameLogic";
import { ViduContext } from "../../pages/Game";
import { Link } from "react-router-dom";
import InGameModal from "../modals/InGameModal";
import exitIcon from "../../assets/img/exitIcon.png";
import cheese from "../../assets/img/cheesePlate.png";
import trap from "../../assets/img/trap.png";
import empty from "../../assets/img/empty.png";
import actionIcon from "../../assets/img/actionCardIcon.png";
import roomTitle from "../../assets/img/roomTitle.png";

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
    <div className="absolute inset-x-0 top-0 flex justify-around items-between h-[90px] shadow-lg bg-yellow-100 bg-opacity-70">
      <div
        className="w-30 h-auto p-2"
        onClick={openModal}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          cursor: "pointer",
        }}
      ></div>

      {/* 인게임에서 액션 카드 정보 */}
      <InGameModal />
      <div
        className="flex flex-col justify-center items-center w-[300px] h-[90px] ml-200"
        style={{ backgroundImage: `url("${roomTitle}")` }}
      >
        <div className="flex justify-center items-center w-[300px] h-[70px] order-4 border-black text-xl">
          {_roomName}
        </div>
      </div>
      {gameState === "DRAW_CARD" && (
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center w-[800px] h-[40px] text-amber-800">
            Catch Mouse If You Cat
          </div>
          <div
            className="flex justify-evenly w-[700px] mb-1"
            style={{ marginLeft: "auto" }}
          >
            <div className="flex justify-center items-center w-[100px] text-3xl text-amber-600">
              <img src={cheese} className="w-14 h-auto" />
              {gameData.gamePlayDTO.cheezeCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] text-3xl text-amber-600">
              <img src={trap} className="w-14 h-auto" />
              {gameData.gamePlayDTO.mousetrap}
            </div>
            <div className="flex justify-center items-center w-[100px] text-3xl text-amber-600">
              <img src={empty} className="w-14 h-auto" />
              {gameData.gamePlayDTO.normalCnt}
            </div>
            <div className="flex justify-center items-center w-[100px] text-3xl text-amber-600">
              <img src={actionIcon} className="w-14 h-auto" />
              {gameData.gamePlayDTO.actionCnt}
            </div>
          </div>
          {(gameState === "DRAW_CARD" ||
            gameState === "EVENT_OCCUR" ||
            gameState === "GAME_END") && (
            <div className="flex flex-col items-center w-[400px] h-[80px]">
              <div className="flex justify-center items-center w-[400px] h-[40px] text-3xl text-amber-600">
                {gameData.gamePlayDTO.curRound} 라운드
              </div>
              <div className="flex justify-center items-center w-[400px] h-[40px]">
                <div className="flex justify-center items-center w-[200px] text-3xl text-amber-600">
                  남은 카드 수 :{" "}
                  {gameData.gameUsers.length -
                    gameData.gamePlayDTO.tableCards.length}{" "}
                  장
                </div>
                <div className="flex justify-center items-center w-[200px] text-3xl text-amber-600">
                  뽑은 카드 수 : {gameData.gamePlayDTO.tableCards.length} 장
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {gameState === "WAIT" && (
        <Link to="/lobby">
          <img
            src={exitIcon}
            style={{ width: "80px", height: "auto" }}
            onClick={onClickHandler}
          />
        </Link>
      )}
    </div>
  );
};
