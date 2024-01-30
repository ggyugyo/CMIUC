import Modal from "react-modal";
import { useEffect } from "react";
import { GameTimer } from "./GameTimer";

export const GameStart = ({
  gameState,
  setGameState,
  gameStartModal,
  setGameStartModal,
}) => {
  useEffect(() => {
    setGameStartModal(true);
  }, []);
  return (
    <Modal isOpen={gameStartModal} ariaHideApp={false}>
      <div>게임시작</div>
      <GameTimer gameState={gameState} setGameState={setGameState} />
    </Modal>
  );
};
