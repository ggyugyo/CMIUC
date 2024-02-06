import { memo } from "react";

export const GameVideoListItem = ({ player }) => {
  // console.log(player);
  return (
    <div className="flex flex-col justify-center items-center w-[300px] h-[200px] border-4 border-black">
      <div>memberId: {player.memberId}</div>
      <div>nickname: {player.nickname}</div>
      <div>order: {player.order}</div>
      <div>jobId: {player.jobId}</div>
      <div>cards: {player.cards}</div>
    </div>
  );
};

// export default memo(GameVideoListItem);
