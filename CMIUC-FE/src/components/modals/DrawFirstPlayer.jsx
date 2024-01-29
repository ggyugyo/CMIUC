import { useState, useRef, useEffect } from "react";
import Modal from "react-modal";

export const DrawFirstPlayer = ({
  gameState,
  setGameState,
  playerNumber,
  setPlayerNumber,
  setPlayerInfo,
  setFirstPlayerModal,
  setRoundAlert,
}) => {
  useEffect(() => {
    setGameState("DRAW_FIRST_PLAYER");
  }, []);

  const [drawCard, setDrawCard] = useState([]);
  const playerInput = useRef(null);

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

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (parseInt(playerNumber) < 4) {
      alert("플레이어 수는 4명 이상이어야 합니다.");
      playerInput.current.focus();
      return;
    } else if (parseInt(playerNumber) > 6) {
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
  };

  const onClickHandler = () => {
    console.log(drawCard);
    const newPlayerInfo = drawCard.map((card, index) => {
      return {
        userName: ++index,
        isFisrtPlayer: Number(card) === Number(playerNumber) ? true : false,
        userRole: 0,
        userCard: [],
      };
    });
    console.log(newPlayerInfo);
    setPlayerInfo(newPlayerInfo);
    setRoundAlert(true);
    setGameState("");
  };

  return (
    <Modal
      isOpen={gameState === "DRAW_FIRST_PLAYER" ? true : false}
      ariaHideApp={false}
      onRequestClose={() => setFirstPlayerModal(false)}
    >
      <h1>선 카드 뽑기</h1>
      <form onSubmit={onSubmitHandler}>
        <input
          ref={playerInput}
          value={playerNumber}
          onChange={onChangeHandler}
        />
      </form>
      <div>{drawCard}</div>
      <button onClick={onClickHandler}>선 카드 뽑기</button>
    </Modal>
  );
};
