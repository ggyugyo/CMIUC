import { useContext } from "react";
import { GameContext } from "./GameLogic";

export const GameVideoListItem = ({ player }) => {
  const { gameState } = useContext(GameContext);

  if (gameState !== "WAIT") {
    return (
      <div className="flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-black">
        <div>memberId: {player.memberId}</div>
        <div>nickname: {player.nickname}</div>
        <div>order: {player.order}</div>
        <div>jobId: {player.jobId}</div>
        <div>cards: {player.cards}</div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-black">
        <div>memberId: {player.memberId}</div>
        <div>nickname: {player.nickname}</div>
        <div>order: {player.order}</div>
        <div>state: {player.state}</div>
        <div>ready: {JSON.parse(player.ready)}</div>
      </div>
    );
  }
};

// export default memo(GameVideoListItem);
