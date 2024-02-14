import { useContext } from "react";
import { GameContext } from "./GameLogic";
import { ViduContext } from "../../pages/Game";
import { GameVideoListItemSetting } from "./GameVideoListItemSetting";
import mute_vidu from "../../assets/image/game/mute_vidu.png";

export const GameVideoListItem = ({ player, curTurnPlayer, video }) => {
  const { gameState, gameData } = useContext(GameContext);
  const { mainStreamManager } = useContext(ViduContext);
  const { memberId } = player;

  let curTurnBorderColor = "black";

  if (
    gameState === "DRAW_CARD" &&
    player.memberId === curTurnPlayer?.memberId
  ) {
    //
    curTurnBorderColor = "green-700";
  }

  let muteUser = undefined;
  let selfName = undefined;

  if (!!gameData) {
    muteUser = [...gameData?.gameUsers].find((user) => {
      if (gameState === "DRAW_CARD" && user.cards.includes(1)) {
        return user;
      } else return undefined;
    });
  }

  selfName = localStorage.getItem("nickname");

  return (
    <div
      className={`relative flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-${curTurnBorderColor}`}
    >
      <GameVideoListItemSetting
        streamManager={video}
        selfVideo={memberId === Number(localStorage.getItem("id"))}
      />
      {muteUser?.nickname === selfName && muteUser?.memberId === memberId ? (
        <div
          className={`z-20 absolute w-[300px] h-[200px] bg-cover`}
          style={{ backgroundImage: `url(${mute_vidu})`, opacity: 0.5 }}
        ></div>
      ) : null}
      <div className="absolute w-[200px] z-10 bottom-[0px] text-center bg-gray-300 rounded-lg opacity-75">
        <span className="text-black text-lg font-semibold">
          {player.nickname}
        </span>
      </div>
    </div>
  );
};
// export default memo(GameVideoListItem);
