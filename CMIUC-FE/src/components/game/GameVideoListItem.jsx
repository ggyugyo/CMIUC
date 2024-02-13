import { useContext } from "react";
import { GameContext } from "./GameLogic";
import { GameVideoListItemSetting } from "./GameVideoListItemSetting";

export const GameVideoListItem = ({ player, curTurnPlayer, video }) => {
  const { gameState } = useContext(GameContext);
  const { memberId } = player;

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

  return (
    <div
      className={`relative flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-${curTurnBorderColor}`}
    >
      <GameVideoListItemSetting
        streamManager={video}
        selfVideo={memberId === Number(localStorage.getItem("id"))}
      />
      {/* <div>nickname: {player.nickname}</div> */}
    </div>
  );
};
// export default memo(GameVideoListItem);
