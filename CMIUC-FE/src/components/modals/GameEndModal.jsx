import Modal from "react-modal";
import { useEffect } from "react";
import { GameTimer } from "../game/GameTimer";
import mainImg from "../../assets/img/mainImg.png";
import { playSFX, SFX_LIST } from "../../settings/SoundSetting";

const customStyles = {
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    padding: "0px",
    border: "10px solid black",
    borderRadius: "50%",
    width: "500px",
    height: "500px",
    top: "50%",
    left: "50%",
    zIndex: 1000,
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(169, 169, 169, 0)",
  },
};

export const GameEndModal = ({
  modalState,
  setModalState,
  timer,
  setTimer,
  gameState,
}) => {
  playSFX(SFX_LIST.EMPTY);

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
      <div
        className="w-[400px] h-[100px] p-[10px] flex flex-col items-center"
        style={{ position: "relative", top: "-70px" }}
      >
        <div className="flex justify-center">
          <img src={mainImg} className="w-1/2" />
        </div>
        <div className="text-5xl font-bold text-black">
          <div className="flex justify-center">GAME OVER</div>
        </div>
        <div className="flex items-center justify-center">
          <GameTimer timer={timer} setTimer={setTimer} gameState={gameState} />
        </div>
      </div>
    </Modal>
  );
};
