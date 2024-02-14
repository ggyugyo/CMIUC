import Modal from "react-modal";
import { useEffect } from "react";
import { GameTimer } from "../game/GameTimer";
import cat from "../../assets/img/cat.png";
import mouse from "../../assets/img/mouse.png";

const customStyles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "0px",
    border: "10px solid blue",
    borderRadius: "50%",
    width: "500px",
    height: "500px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
};

export const GameStartModal = ({
  modalState,
  setModalState,
  timer,
  setTimer,
  gameState,
  setGameState,
}) => {
  useEffect(() => {
    setModalState(true);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setModalState(false);
      setTimer(null);
      setGameState("PLAYER_ROLE");
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
      <div
        className="w-[400px] h-[100px] p-[10px] flex flex-col items-center"
        style={{ position: "relative", top: "-70px" }}
      >
        <div className="flex justify-center">
          <img src={cat} className="w-1/2" style={{ marginRight: "100px" }} />
          <img src={mouse} className="w-1/2" />
        </div>
        <div className="text-6xl font-bold text-blue-500">
          <div className="flex justify-center">GAME START!</div>
        </div>
        <div className="flex items-center justify-center">
          <GameTimer
            timer={timer}
            setTimer={setTimer}
            gameState={gameState}
            setGameState={setGameState}
          />
        </div>
      </div>
    </Modal>
  );
};
