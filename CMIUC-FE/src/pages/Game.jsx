import { GameLayout } from "../layouts/GameLayout.jsx";
import { GameLogic } from "../components/game/GameLogic.jsx";

export const Game = () => {
  // 오픈비두
  return (
    <div className="mx-auto my-auto">
      <GameLayout>
        {/* 오픈비두 */}
        <GameLogic />
      </GameLayout>
    </div>
  );
};
