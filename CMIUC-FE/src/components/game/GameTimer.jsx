import { useEffect } from "react";

export const GameTimer = ({ gameState, timer, setTimer }) => {
  useEffect(() => {
    switch (gameState) {
      case "GAME_START":
        setTimer(3);
        break;
      case "PLAYER_ROLE":
        setTimer(5);
        break;
      case "ROUND":
        setTimer(3);
        break;
      case "DRAW_CARD":
        setTimer(120);
        break;
      case "EVENT_OCCUR":
        setTimer(8);
      case "GAME_END":
        setTimer(5);
        break;
    }
  }, []);

  useEffect(() => {
    // console.log(gameState);
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

  return <div>{/* {timer} */}</div>;
};
