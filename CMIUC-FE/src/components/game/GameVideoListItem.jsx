import { memo } from "react";

export const GameVideoListItem = ({ player }) => {
  // console.log(player);
  return (
    <div className="flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-black">
      <div>userID: {player.userID}</div>
      <div>userName: {player.userName}</div>
      <div>isFirstPlayer: {JSON.stringify(player.isFirstPlayer)}</div>
      <div>userRole: {player.userRole}</div>
      <div>userCard: {player.userCard}</div>
    </div>
  );
};

// export default memo(GameVideoListItem);