import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CardInfoMap } from "../../map/game/CardInfoMap.jsx";
import resultImg from "../../assets/img/resultImg.png";
import mouseDance from "../../assets/img/mouseDanceGif.gif";
import catDance from "../../assets/img/catDanceGif.gif";

export const ResultGame = () => {
  const location = useLocation();
  const { result, playerInfo, roomId, exit } = location.state;

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
      trapNum = CardInfoMap(4)["쥐덫"];
      cheeseArr = CardInfoMap(4)["치즈"];
      break;

    case 5:
      trapNum = CardInfoMap(5)["쥐덫"];
      cheeseArr = CardInfoMap(5)["치즈"];
      break;

    case 6:
      trapNum = CardInfoMap(6)["쥐덫"];
      cheeseArr = CardInfoMap(6)["치즈"];
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
      style={{
        backgroundImage: `url("${resultImg}")`,
        position: "relative", // Ensure positioning context
        height: "100vh", // Assuming full viewport height
        overflow: "hidden", // Hide overflowing content
      }}
      className="flex flex-col justify-center items-center bg-cover bg-center"
    >
      <h1 className="text-4xl text-amber-800">{resultMessage}</h1>
      <div style={{ position: "absolute", bottom: "0", right: "0" }}>
        {foundTrap || notFoundCheese ? (
          <img src={catDance} alt="Cat Dancing" />
        ) : (
          <img src={mouseDance} alt="Mouse Dancing" />
        )}
      </div>
      {/* 종료 후 역할 공개 */}
      <div>
        <h2 className="text-2xl">역할 공개</h2>
        <div className="flex flex-row items-center justify-center space-x-5">
          {playerInfo.map((player) => (
            <div key={player.memberId}>
              <div>
                <h3 className="text-black text-2xl">{player.nickname}</h3>
                <p className="text-blue text-xl">
                  {player.jobId === 0 ? "쥐" : "고양이"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="mt-5 text-xl py-3 px-6 rounded-md bg-opacity-50 bg-gray-300 text-black cursor-pointer transition duration-300 hover:bg-opacity-100"
        onClick={() =>
          navigate("/lobby"
          // , {
          //   state: {
          //     winners,
          //     results: { foundTrap, notFoundCheese, foundAllCheese },
          //     clickUserId,
          //     resultMessage,
          //     roomId,
          //     exit,
          //   },
          // }
          )
        }
      >
        방 나가기
      </button>
    </div>
  );
};
