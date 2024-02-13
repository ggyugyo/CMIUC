import Modal from "react-modal";
import { useEffect } from "react";
import { GameTimer } from "../game/GameTimer";
import { motion } from "framer-motion";
import { useContext } from "react";
import { GameContext } from "../game/GameLogic";

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

export const GamePlayerRoleModal = ({
  modalState,
  setModalState,
  timer,
  setTimer,
  gameState,
  setGameState,
}) => {
  const { gameData } = useContext(GameContext);
  useEffect(() => {
    setModalState(true);
  }, []);

  const _player = [...gameData.gameUsers].find((player) => {
    if (player.memberId === Number(localStorage.getItem("id"))) {
      return player;
    }
  });

  const content = _player.jobId === 1 ? "고양이" : "쥐";

  useEffect(() => {
    if (timer === 0) {
      setModalState(false);
      setTimer(null);
      setGameState("ROUND");
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
      <div className="text-[30px]">나의역할나의울음소리찍찍야옹</div>
      <div className="text-[30px]">{content}</div>
      <GameTimer timer={timer} setTimer={setTimer} gameState={gameState} />
    </Modal>
  );
};
