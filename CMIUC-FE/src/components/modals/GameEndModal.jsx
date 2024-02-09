import Modal from "react-modal";
import { useEffect } from "react";
import { GameTimer } from "../game/GameTimer";

const customStyles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "0px",
    border: "none",
  },
};

export const GameEndModal = ({
  modalState,
  setModalState,
  timer,
  setTimer,
  gameState,
}) => {
  useEffect(() => {
    setModalState(true);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setModalState(false);
      setTimer(null);
    }
  }, [timer]);

  return (
    <Modal
      isOpen={modalState}
      ariaHideApp={false}
      style={customStyles}
      onRequestClose={() => {
        setModalState(false);
      }}
    >
      <div className="border-4 border-black w-[480px] p-[10px] flex flex-col justify-center content-center items-center">
        <div className="text-[30px]">GAME OVER</div>
        <GameTimer timer={timer} setTimer={setTimer} gameState={gameState} />
      </div>
    </Modal>
  );
};