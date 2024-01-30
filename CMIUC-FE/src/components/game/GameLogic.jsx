import { useNavigate } from "react-router-dom";
import { Button } from "react95";

export const GameLogic = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        onClick={() => {
          navigate("start");
        }}
      >
        게임 시작 컴포넌트
      </Button>
      <Button
        onClick={() => {
          navigate("card");
        }}
      >
        카드 선택, 카드 섞기 이용할 컴포넌트
      </Button>
    </div>
  );
};
