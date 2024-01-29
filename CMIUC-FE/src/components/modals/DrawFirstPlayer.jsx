import { useState, useRef } from "react";

export const DrawFirstPlayer = () => {
  const [player, setPlayer] = useState(0);
  const [drawCard, setDrawCard] = useState([]);
  const playerInput = useRef(null);

  const onChangeHandler = (e) => {
    setPlayer(e.target.value);
  };

  const shuffle = (cardDeck) => {
    // 피셔-예이츠 셔플
    let shuffled = [];
    for (let i = 0; cardDeck.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * cardDeck.length);
      shuffled = shuffled.concat(cardDeck.splice(randomIndex, 1));
    }
    return shuffled;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const newDrawCard = new Array(parseInt(player)).fill(0).map((_, index) => {
      return ++index;
    });
    setDrawCard(shuffle(newDrawCard));
  };

  console.log(drawCard);

  return (
    <div>
      {/* form 부분 -> 모달로 가보자! */}
      <form onSubmit={onSubmitHandler}>
        <input ref={playerInput} value={player} onChange={onChangeHandler} />
      </form>
    </div>
  );
};
