import { useContext } from "react";
import { GameContext } from "./GameLogic";
import GameVideoListItemSetting from "./GameVideoListItemSetting";

export const GameVideoListItem = ({ player, curTurnPlayer, video }) => {
  const { gameState } = useContext(GameContext);

  let curTurnBorderColor = "black";

  if (
    gameState === "DRAW_CARD" &&
    player.memberId === curTurnPlayer?.memberId
  ) {
    curTurnBorderColor = "green-700";
  }
  // if (gameState === "DRAW_CARD") {
  //   console.log(
  //     "curTurnBorderColorITEM",
  //     curTurnBorderColor,
  //     typeof player.memberId,
  //     typeof curTurnPlayer.memberId
  //   );
  // }

  if (gameState !== "WAIT") {
    return (
      <div
        className={`relative flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-${curTurnBorderColor}`}
      >
        <GameVideoListItemSetting streamManager={video} />
        <div>nickname: {player.nickname}</div>
        {/* <div>memberId: {player.memberId}</div>
        <div>order: {player.order}</div>
        <div>jobId: {player.jobId}</div>
        <div>cards: {player.cards}</div> */}
      </div>
    );
  } else {
    return (
      <div
        className={`relative flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-black`}
      >
        <GameVideoListItemSetting streamManager={video} />
        <div>nickname: {player.nickname}</div>
        {/* <div>memberId: {player.memberId}</div>
        <div>order: {player.order}</div>
        <div>state: {player.state}</div>
        <div>ready: {JSON.parse(player.ready)}</div> */}
      </div>
    );
  }
};

// export default memo(GameVideoListItem);
