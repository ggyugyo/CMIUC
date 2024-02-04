import Modal from "react-modal";
import { useState, useEffect, useContext } from "react";
import { GameContext } from "../game/GameLogic";
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

export const GameCardDealModal = ({
  modalState,
  setModalState,
  timer,
  setTimer,
  gameState,
  setGameState,
  setPlayerInfo,
  initCardDeck,
  setInitCardDeck,
}) => {
  const [flag, setFlag] = useState(false);
  const { playerInfo, round, tableCard, setTableCard } =
    useContext(GameContext);

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

  useEffect(() => {
    if (timer === 0) {
      setModalState(false);
      setGameState("DRAW_CARD");
      setTimer(null);
    }
  }, [timer]);

  const removeActionCard = (card) => {
    let shuffled = [];
    for (let i = 0; i < 5; i += 1) {
      const randomIndex = Math.floor(Math.random() * card.length);
      shuffled = shuffled.concat(card.splice(randomIndex, 1));
    }
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

  const generateCardDeck = (start, end, actionStart) => {
    let newInitCardDeck = [];
    if (round !== 1) {
      newInitCardDeck = [...initCardDeck].filter(
        (card) => !tableCard.includes(card)
      );
    } else {
      const basic = Array.from(
        { length: end - start + 1 },
        (_, i) => i + start
      );
      const action = Array.from({ length: 6 }, (_, i) => i + actionStart);
      const randomAction = removeActionCard([...action]);
      const shuffledCardDeck = shuffle(basic.concat(randomAction));
      newInitCardDeck = newInitCardDeck.concat(shuffledCardDeck);
    }

    setInitCardDeck(newInitCardDeck);
    return newInitCardDeck;
  };

  const cardDeck = () => {
    const start = 1;
    switch (playerInfo.length) {
      case 4:
        return generateCardDeck(start, 15, 16, tableCard);
      case 5:
        return generateCardDeck(start, 20, 21, tableCard);
      default:
        return generateCardDeck(start, 25, 26, tableCard);
    }
  };

  const cardDeal = (card) => {
    let cardDealList = [];
    for (let i = 0; i < card.length; i += 5 - (round - 1)) {
      cardDealList.push(card.slice(i, i + (5 - (round - 1))));
    }
    return cardDealList;
  };

  const onClickHandler = () => {
    setFlag(true);
    const roundCardDeck = cardDeck();
    const cardDealList = cardDeal(roundCardDeck);
    const newPlayerInfo = playerInfo.map((player, index) => {
      return {
        ...player,
        userCard: cardDealList[index],
      };
    });
    setPlayerInfo(newPlayerInfo);
    console.log(newPlayerInfo);
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
        <GameTimer
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
        />
        <button onClick={onClickHandler} className="border-4">
          카드 배분하기
        </button>
      </div>
    </Modal>
  );
};
