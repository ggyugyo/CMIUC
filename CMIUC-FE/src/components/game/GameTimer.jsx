import { useEffect } from "react";

export const GameTimer = ({ gameState, timer, setTimer }) => {
  useEffect(() => {
    switch (gameState) {
      case "GAME_START":
        setTimer(1);
        break;
      case "DRAW_FIRST_PLAYER":
        setTimer(1);
        break;
      case "DRAW_PLAYER_ROLE":
        setTimer(1);
        break;
      case "ROUND":
        setTimer(1);
        break;
      case "CARD_DEAL":
        setTimer(3);
        break;
      case "DRAW_CARD":
        setTimer(120);
        break;
      case "GAME_END":
        setTimer(2);
        break;
    }
  }, []);

  useEffect(() => {
    console.log(gameState);
    const decreaseTime = setInterval(() => {
      setTimer((timer) => timer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(decreaseTime);
    }
    return () => {
      clearInterval(decreaseTime);
    };
  }, [timer]);

  return <div>{timer}</div>;
};
