import { GameLayout } from "../layouts/GameLayout.jsx";
import { GameLogic } from "../components/game/GameLogic.jsx";

export const Game = () => {
  return (
    <>
      <GameLayout>
        <GameLogic />
      </GameLayout>
    </>
  );
};
