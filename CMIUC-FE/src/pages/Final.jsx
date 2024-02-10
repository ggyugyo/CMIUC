import { useLocation } from "react-router-dom";
import Win from "../components/result/Win";
import Lose from "../components/result/Lose";

export function Final() {
  const location = useLocation();
  const { state } = location;

  // ResultGame.jsx에서 navigate params로 보낸 데이터 받아오기
  const results = state.results;
  const winners = state.winners;
  const clickUserId = state.clickUserId;
  const roomId = state.roomId;

  // 승/패 + 쥐/고양이 여부에 따라 컴포넌트 다르게 보여주기.
  // props로 게임의 종료 조건(치즈 찾았다, 덫 찾았다, 치즈 못 찾았다)의 상태를 묶은 results가 각 컴포로 내려간다.
  return (
    <div>
      {winners.includes(clickUserId) ? (
        <Win results={results} roomId={roomId} />
      ) : (
        <Lose results={results} roomId={roomId} />
      )}
    </div>
  );
}
