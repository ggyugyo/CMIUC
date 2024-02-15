import { useContext } from "react";
import { GameContext } from "./GameLogic";
import { ViduContext } from "../../pages/Game";
import { GameVideoListItemSetting } from "./GameVideoListItemSetting";
import mute_vidu from "../../assets/image/game/mute_vidu.png";
import cat_role from "../../assets/image/game/videosticker/cat_role.png";
import mouse_role from "../../assets/image/game/videosticker/mouse_role.png";

export const GameVideoListItem = ({ player, curTurnPlayer, video }) => {
  const { gameState, gameData } = useContext(GameContext);
  const { mainStreamManager } = useContext(ViduContext);
  const { memberId } = player;

  let curTurnBorderColor = "border-gray-400";

  if (gameState === "WAIT") {
    [...gameData.gameUsers].find((user) => {
      if (user.memberId === memberId && user.ready === true) {
        curTurnBorderColor = "border-green-400 animate-bounce";
      }
    });
  }

  if (
    gameState === "DRAW_CARD" &&
    player.memberId === gameData.gamePlayDTO.curTurn
  ) {
    //
    curTurnBorderColor = "border-purple-400 duration-300 animate-bounce";
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

  const myId = Number(localStorage.getItem("id"));
  const myData = [...gameData.gameUsers].find((user) => user.memberId === myId);
  let imgsrc = undefined;

  if (gameState !== "WAIT") {
    if (myData.jobId === 1) {
      imgsrc = cat_role;
    } else if (myData.jobId === 0) {
      imgsrc = mouse_role;
    }
  }

  return (
    <>
      <div
        className={`relative flex flex-col justify-center items-center w-[300px] h-[200px] border-4 ${curTurnBorderColor} overflow-hidden rounded-lg bg-slate-300`}
      >
        {gameState === "DRAW_CARD" && myId === memberId && (
          // <img
          //   src={imgsrc}
          //   className="absolute w-[40px] h-[40px] top-0 right-0"
          // />
          <div
            style={{
              backgroundImage: `url("${imgsrc}")`,
            }}
            className={`absolute w-[40px] h-[40px] top-0 right-0 bg-cover bg-center z-10`}
          ></div>
        )}
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
        {player.memberId === gameData?.gamePlayDTO?.curTurn && (
          <span className="absolute bottom-[3px] left-[60px] h-5 w-5 z-10">
            <span className="absolute animate-ping h-5 w-5 rounded-full bg-green-800 opacity-75"></span>
            <span className="absolute inline-flex rounded-full h-5 w-5 bg-lime-500"></span>
          </span>
        )}
      </div>
    </>
  );
};
// export default memo(GameVideoListItem);
