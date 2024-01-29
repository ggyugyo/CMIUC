import { useState } from "react";
import { DrawFirstPlayer } from "../modals/DrawFirstPlayer";
import Modal from "react-modal";

export const GameLogic = () => {
  const [firstPlayerModal, setFirstPlayerModal] = useState(false);
  // 선카드 추가 필요
  const drawFirstPlayer = () => {
    setFirstPlayerModal(!firstPlayerModal);
  };

  return (
    <div>
      {/* form 부분 -> 모달로 가보자! */}
      <button onClick={drawFirstPlayer}>선 뽑기</button>
      <Modal
        isOpen={firstPlayerModal}
        ariaHideApp={false}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <DrawFirstPlayer />
      </Modal>
      {/* <GameFirstPlayer drawCard={drawCard} /> */}
    </div>
  );
};
