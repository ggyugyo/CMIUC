import Modal from "react-modal";
import { useEffect } from "react";
import { GameTimer } from "../game/GameTimer";
import { motion } from "framer-motion";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100vw",
    height: "100vh",
  },
  content: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto auto",
    width: "330px",
    height: "200px",
    borderRadius: "20px",
  },
};

export const GameEventModal = ({
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

  let title = "";
  let content = "";

  useEffect(() => {
    if (timer === 0) {
      setModalState(false);
      setGameState("DRAW_CARD");
      setTimer(null);
    }
  }, [timer]);

  return (
    <Modal
      isOpen={modalState}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      overlayElement={(props, overlayElement) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          {...props}
        >
          {overlayElement}
        </motion.div>
      )}
      style={customStyles}
      onRequestClose={() => {
        setModalState(false);
      }}
    >
      <div className="text-[30px]">{title}</div>
      <div className="text-[30px]">{content}</div>
      <GameTimer timer={timer} setTimer={setTimer} gameState={gameState} />
    </Modal>
  );
};
