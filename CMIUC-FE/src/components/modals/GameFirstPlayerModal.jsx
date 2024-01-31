import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";

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

export const GameFirstPlayerModal = ({
  modalState,
  setModalState,
  // timer,
  // setTimer,
  gameState,
  setGameState,
  playerInfo,
  setPlayerInfo,
}) => {
  useEffect(() => {
    setModalState(true);
  }, []);

  const [drawCard, setDrawCard] = useState([]);
  const [playerNumber, setPlayerNumber] = useState(0);
  const playerInput = useRef(null);

  useEffect(() => {
    if (playerNumber !== 0) {
      setPlayerNumber((prev) => prev);
      createCard();
    } else {
      alert("플레이어 수를 입력해주세요 (4 ~ 6)");
    }
  }, [playerNumber]);

  useEffect(() => {
    if (drawCard.length !== 0) {
      setDrawCard((prev) => prev);
    }
  }, [drawCard]);

  const onChangeHandler = (e) => {
    setPlayerNumber(e.target.value);
  };

  const shuffle = (cardDeck) => {
    let shuffled = [];
    for (let i = 0; cardDeck.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * cardDeck.length);
      shuffled = shuffled.concat(cardDeck.splice(randomIndex, 1));
    }
    return shuffled;
  };

  const createCard = () => {
    if (playerNumber < 4) {
      alert("플레이어 수는 4명 이상이어야 합니다.");
      playerInput.current.focus();
      return;
    } else if (playerNumber > 6) {
      alert("플레이어 수는 6명을 초과할 수 없습니다.");
      playerInput.current.focus();
      return;
    }

    const newDrawCard = new Array(parseInt(playerNumber))
      .fill(0)
      .map((_, index) => {
        return ++index;
      });

    setDrawCard(shuffle(newDrawCard));
    // console.log(drawCard);
  };

  const onClickHandler = () => {
    console.log(drawCard);
    console.log(playerNumber);
    const newPlayerInfo = drawCard.map((card, index) => {
      return {
        userID: ++index,
        userName: String(index),
        isFisrtPlayer: Number(card) === Number(playerNumber) ? true : false,
        userRole: 0,
        userCard: [],
      };
    });
    setPlayerInfo(newPlayerInfo);
    // console.log(newPlayerInfo);
    setModalState(false);
    setGameState("DRAW_PLAYER_ROLE");
  };

  return (
    <Modal
      isOpen={modalState}
      ariaHideApp={false}
      style={customStyles}
      // onRequestClose={() => setModalState(false)}
    >
      <div className="border-4 border-black w-[480px] p-[10px] flex flex-col justify-center content-center items-center gap-[10px]">
        <h1 className="text-[30px]">선 카드 뽑기</h1>

        <input
          className="border-4 border-black"
          ref={playerInput}
          value={playerNumber}
          onChange={onChangeHandler}
        />

        <button onClick={onClickHandler} className="border-4">
          선 카드 뽑기
        </button>
      </div>
    </Modal>
  );
};
