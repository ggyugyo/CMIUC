import Modal from "react-modal";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../game/GameLogic";

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

export const GameCardDealModal = ({
  modalState,
  setModalState,
  gameState,
  setGameState,
  setPlayerInfo,
}) => {
  const [flag, setFlag] = useState(false);
  const { playerInfo } = useContext(UserContext);

  useEffect(() => {
    setModalState(true);
  }, []);

  useEffect(() => {
    return () => {
      if (flag === false) {
        onClickHandler();
      }
    };
  }, [flag]);

  const removeActionCard = (card) => {
    let shuffled = [];
    for (let i = 0; i < 5; i += 1) {
      const randomIndex = Math.floor(Math.random() * card.length);
      shuffled = shuffled.concat(card.splice(randomIndex, 1));
    }
    console.log(shuffled);
    return shuffled;
  };

  const shuffle = (card) => {
    let shuffled = [];
    for (let i = 0; card.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * card.length);
      shuffled = shuffled.concat(card.splice(randomIndex, 1));
    }
    return shuffled;
  };

  const carDeck = () => {
    const start = 1;
    switch (playerInfo.length) {
      case 4: {
        const end = 15;
        const basic = Array.from(
          { length: end - start + 1 },
          (_, i) => i + start
        );
        const action = Array.from({ length: 6 }, (_, i) => i + 16);
        const randomAction = removeActionCard([...action]);
        return shuffle(basic.concat(randomAction));
      }
      case 5: {
        const end = 19;
        const basic = Array.from(
          { length: end - start + 1 },
          (_, i) => i + start
        );
        const action = Array.from({ length: 6 }, (_, i) => i + 20);
        const randomAction = removeActionCard([...action]);
        return shuffle(basic.concat(randomAction));
      }
      default: {
        const end = 26;
        const basic = Array.from(
          { length: end - start + 1 },
          (_, i) => i + start
        );
        const action = Array.from({ length: 6 }, (_, i) => i + 27);
        const randomAction = removeActionCard([...action]);
        return shuffle(basic.concat(randomAction));
      }
    }
  };

  console.log(carDeck());

  const onClickHandler = () => {
    setFlag(true);
    setGameState("DRAW_CARD");
  };

  return (
    <Modal
      isOpen={modalState}
      ariaHideApp={false}
      style={customStyles}
      onRequestClose={() => setModalState(false)}
    >
      <div className="border-4 border-black w-[480px] p-[10px] flex flex-col justify-center content-center items-center gap-[10px]">
        <h1 className="text-[30px]">카드를 나눠주세요</h1>
        <h2 className="text-[20px]">카드 애니메이션 자리</h2>
        <button onClick={onClickHandler} className="border-4">
          카드 배분하기
        </button>
      </div>
    </Modal>
  );
};
