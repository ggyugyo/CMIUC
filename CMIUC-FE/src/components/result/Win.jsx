import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import mouseWinBackImg from "../../assets/img/mouseWinBackImg.png";

function Win(props) {
  // Final 페이지에서 내려준 (1)props 받아서 (2)구조분해할당
  const { results } = props;
  const { roomId } = props;
  const { foundTrap, foundAllCheese, notFoundCheese } = results;
  const navigate = useNavigate();

  // 게임 종료 조건에 따른 메시지 설정
  let message = "";
  if (foundTrap) {
    message = "고양이가 덫을 찾아 이겼습니다.";
  } else if (notFoundCheese) {
    message = "치즈를 모두 찾지 못했기 때문에 고양이가 이겼습니다.";
  } else if (foundAllCheese) {
    message = "치즈를 모두 찾았기 때문에 쥐가 이겼습니다.";
  }

  const onclickHandler = () => {
    navigate(`game/${roomId}`, {
      state: {
        roomId,
      },
    });
  };
  return (
    <div
      style={{
        backgroundImage: `url("${(foundTrap || notFoundCheese) ? catWinBackImg : mouseWinBackImg}")`,
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center overflow-hidden"
    >
      <div className="flex flex-col items-center mt-11 h-screen space-y-3">
        <h1 className="text-[70px]">최종 페이지</h1>
        <h1 className="text-5xl animate-flash">{message}</h1>
        <Link
          to={`/game/${roomId}`}
          className="hover:border-sky-400 text-[24px] w-[120px] py-[16px] text-center border-black border-[8px] ml-[16px] text-blue-400 duration-500 transition-colors"
        >
          방으로 돌아가기
        </Link>
        <Link
          to={`/lobby`}
          className="hover:border-sky-400 text-[24px] w-[120px] py-[16px] text-center border-black border-[8px] ml-[16px] text-blue-400 duration-500 transition-colors"
        >
          방 나가기
        </Link>
      </div>
    </div>
  );
}

export default Win;
