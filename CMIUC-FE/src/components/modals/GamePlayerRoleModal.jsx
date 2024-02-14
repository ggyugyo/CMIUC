import Modal from "react-modal";
import { useEffect } from "react";
import { GameTimer } from "../game/GameTimer";
import { motion } from "framer-motion";
import { useContext } from "react";
import { GameContext } from "../game/GameLogic";
import cat_role from "../../assets/image/game/rolecard/cat_role.jpg";
import mouse_role from "./assets/image/game/rolecard/mouse_role.jpg";

// 직업에 따라 모달에 이미지 넣기위해 함수로 변경
function customStyles(role) {
  return {
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
      height: "500px",
      borderRadius: "20px",
      background: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url(${role})`,
      backgroundSize: "500px 500px",
      backgroundPosition: "center",
    },
  };
}

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
  // 모달에 이미지 넣기위한 role 변수 설정
  const role = _player.jobId === 1 ? cat_role : mouse_role;
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
      style={customStyles(role)}
      onRequestClose={() => {
        setModalState(false);
      }}
    >
      <div className="flex flex-col items-left h-5/6 ">
        <p className="text-4xl font-bold">내 역할</p>
      </div>
      <p className="text-[35px] font-extrabold text-right">{content}</p>
    </Modal>
  );
};
