import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CardInfoMap } from "../../map/game/CardInfoMap.jsx";
import heartcloud from "../../assets/image/result/heart-cloud.jpg";

export const ResultGame = () => {
  const location = useLocation();
  const { result, playerInfo } = location.state;

  const navigate = useNavigate();

  const [resultMessage, setResultMessage] = useState("");
  const [foundTrap, setFoundTrap] = useState(false);
  const [notFoundCheese, setNotFoundCheese] = useState(false);
  const [foundAllCheese, setFoundAllCheese] = useState(false);

  // 게임 종료 후 승/패 여부에 따른 userId를 담을 배열
  let winners = [];
  let losers = [];

  // (하드코딩) 클릭 유저의 userId
  const clickUserId = localStorage.getItem("id");

  // // dummy data - gameState도 임시로 하드코딩
  // const dummy = {
  //   playerInfo: [
  //     {
  //       userID: 0,
  //       userName: "짱구",
  //       isFisrtPlayer: true,
  //       userRole: 1,
  //       userCard: [7, 1],
  //     },
  //     {
  //       userID: 1,
  //       userName: "철수",
  //       isFisrtPlayer: false,
  //       userRole: 1,
  //       userCard: [],
  //     },
  //     {
  //       userID: 2,
  //       userName: "유리",
  //       isFisrtPlayer: false,
  //       userRole: 0,
  //       userCard: [],
  //     },
  //     {
  //       userID: 3,
  //       userName: "맹구",
  //       isFisrtPlayer: false,
  //       userRole: 0,
  //       userCard: [15],
  //     },
  //     {
  //       userID: 4,
  //       userName: "훈이",
  //       isFisrtPlayer: false,
  //       userRole: 0,
  //       userCard: [20],
  //     },
  //     {
  //       userID: 5,
  //       userName: "흰둥이",
  //       isFisrtPlayer: false,
  //       userRole: 0,
  //       userCard: [21],
  //     },
  //   ],
  //   gameState: "CAT_WIN",
  // };

  // dummy data 구조분해할당
  // const { playerInfo, gameState } = dummy;

  // 게임 종료 후 각 플레이어들이 쥔 카드 -> 게임 결과 메시지 출력에 사용
  const resultCards = playerInfo.reduce(
    (cardList, player) => cardList.concat(player.cards),
    []
  );

  // 플레이어 수에 따라 아이템(덫, 치즈) 설정
  let trapNum = 0;
  let cheeseArr = [];
  switch (playerInfo.length) {
    case 4:
      trapNum = CardInfoMap(4).TRAP;
      cheeseArr = CardInfoMap(4).CHEESE;
      break;

    case 5:
      trapNum = CardInfoMap(5).TRAP;
      cheeseArr = CardInfoMap(5).CHEESE;
      break;

    case 6:
      trapNum = CardInfoMap(6).TRAP;
      cheeseArr = CardInfoMap(6).CHEESE;
      break;
  }

  /* 
   gameState만 넘어오므로
   playerInfo.userCard를 통해 아래 세 가지 경우 중
   어떤 경우로 승패가 났는지 화면에 출력해주고,
   플레이어들을 각 승/패 화면으로 보낸다.
  */
  // 1. 고양이 승 -  덫 찾아서 이긴 경우 (고양이)
  useEffect(() => {
    if (result === "CAT_WIN") {
      for (let i = 0; i < resultCards.length; i++) {
        if (!resultCards.includes(trapNum)) {
          setResultMessage("고양이가 덫을 찾았습니다.");
          setFoundTrap(true);
          return;
        }
      }
    }
  }, [foundTrap]);

  // 2. 고양이 승 - 쥐가 치즈를 못 찾아서 이긴 경우 (고양이)
  useEffect(() => {
    if (result === "CAT_WIN") {
      let arr = [];
      for (let i = 0; i < resultCards.length; i++) {
        if (cheeseArr.includes(resultCards[i])) {
          arr.push(resultCards[i]);
        }
      }
      if (!foundTrap && arr.length > 0) {
        setResultMessage("쥐가 필요한 치즈를 모두 찾지 못했습니다.");
        setNotFoundCheese(true);
      }
    }
  }, [notFoundCheese]);

  // 3. 쥐 승 - 치즈를 모두 찾아서 이긴 경우 (쥐)
  useEffect(() => {
    if (result === "MOUSE_WIN") {
      let arr = [];
      for (let i = 0; i < resultCards.length; i++) {
        if (cheeseArr.includes(resultCards[i])) {
          arr.push(resultCards[i]);
        }
      }
      if (arr.length === 0) {
        setResultMessage("쥐가 필요한 치즈를 모두 찾았습니다.");
        setFoundAllCheese(true);
      }
    }
  }, [foundAllCheese]);

  // 승/패 그룹에 따라 다른 화면으로 보내기 위해 winners/losers 배열에 플레이어들의 memberId를 넣어준다.
  if (foundTrap || notFoundCheese) {
    playerInfo.filter(
      (player) => player.jobId === 1 && winners.push(player.memberId)
    );
    playerInfo.filter(
      (player) => player.jobId === 0 && losers.push(player.memberId)
    );
  } else if (foundAllCheese) {
    playerInfo.filter(
      (player) => player.jobId === 0 && winners.push(player.memberId)
    );
    playerInfo.filter(
      (player) => player.jobId === 1 && losers.push(player.memberId)
    );
  }

  return (
    <div
      style={{ backgroundImage: `url("${heartcloud}")` }}
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center overflow-hidden"
    >
      <h1 className="text-7xl">GAME OVER</h1>
      <h1>{resultMessage}</h1>
      <button
        className="mt-5 text-xl py-3 px-6 rounded-md bg-opacity-50 bg-gray-300 text-black cursor-pointer transition duration-300 hover:bg-opacity-100"
        onClick={() =>
          navigate("/final", {
            state: {
              winners,
              results: { foundTrap, notFoundCheese, foundAllCheese },
              clickUserId,
              resultMessage,
            },
          })
        }
      >
        SKIP
      </button>
    </div>
  );
};
