import { useState, useEffect } from "react";
import Modal from "react-modal";
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

export const GamePlayerRoleModal = ({
  modalState,
  setModalState,
  timer,
  setTimer,
  gameState,
  setGameState,
  playerInfo,
  setPlayerInfo,
}) => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setModalState(true);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setModalState(false);
      setGameState("ROUND");
      setTimer(null);
    }
  }, [timer]);

  useEffect(() => {
    return () => {
      if (flag === false) {
        onClickHandler();
      }
    };
  }, [flag]);

  const role = () => {
    switch (playerInfo.length) {
      case 4:
        return [0, 0, 0, 1, 1];
      case 5:
        return [0, 0, 0, 0, 1, 1];
      default:
        return [0, 0, 0, 0, 1, 1];
    }
  };

  const shuffle = () => {
    let roleCard = role();
    let shuffled = [];
    for (let i = 0; roleCard.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * roleCard.length);
      shuffled = shuffled.concat(roleCard.splice(randomIndex, 1));
    }
    return shuffled;
  };

  const onClickHandler = () => {
    setFlag(true);
    const shuffledRoleCard = shuffle();
    console.log(shuffledRoleCard);
    const newPlayerInfo = playerInfo.map((player, index) => {
      return {
        ...player,
        userRole: shuffledRoleCard[index],
      };
    });
    setPlayerInfo(newPlayerInfo);
    // console.log(newPlayerInfo);
  };

  return (
    <Modal
      isOpen={modalState}
      ariaHideApp={false}
      style={customStyles}
      onRequestClose={() => setModalState(false)}
    >
      <div className="border-4 border-black w-[480px] p-[10px] flex flex-col justify-center content-center items-center gap-[10px]">
        <h1 className="text-[30px]">플레이어 역할 배정</h1>
        <GameTimer
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
        />
        <button onClick={onClickHandler} className="border-4">
          역할 배정하기
        </button>
      </div>
    </Modal>
  );
};
