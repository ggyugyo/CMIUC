import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { CardInfoMap } from "../../map/game/CardInfoMap.jsx";
import resultImg from "../../assets/img/resultImg3.png";
import mouseDance from "../../assets/img/mouseDance.gif";
import catDance from "../../assets/img/catDance.gif";
import { playSFX, SFX_LIST } from "../../settings/SoundSetting";

export const ResultGame = () => {
  const location = useLocation();
  const { result, gameData, roomId, exit } = location.state;

  playSFX(SFX_LIST.GAME_END);

  const navigate = useNavigate();

  const [resultMessage, setResultMessage] = useState("");
  const [foundTrap, setFoundTrap] = useState(false);
  const [notFoundCheese, setNotFoundCheese] = useState(false);
  const [foundAllCheese, setFoundAllCheese] = useState(false);

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
  // const resultCards = playerInfo.reduce(
  //   (cardList, player) => cardList.concat(player.cards),
  //   []
  // );

  // 플레이어 수에 따라 아이템(덫, 치즈) 설정
  let trapNum = 7;

  useEffect(() => {
    switch (result) {
      case "CAT_WIN":
        if ([gameData.gamePlayDTO.tableCards].includes(7)) {
          setResultMessage("고양이 승! 고양이가 덫을 찾았다옹~");
          setFoundTrap(true);
          break;
        } else if (
          // ![gameData.gamePlayDTO.tableCards].includes(trapNum) &&
          gameData.gamePlayDTO.cheezeCnt !== gameData.gameUsers.length
        ) {
          setResultMessage("고양이 승! 쥐가 치즈를 못 찾았다옹~");
          setNotFoundCheese(true);
          break;
        }

      case "MOUSE_WIN":
        if (gameData.gamePlayDTO.cheezeCnt === gameData.gameUsers.length) {
          setResultMessage("쥐 승! 쥐가 치즈를 모두 찾았찍찍~");
          setFoundAllCheese(true);
          break;
        }
      default:
        break; // break 추가
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url("${resultImg}")`,
        position: "relative", // Ensure positioning context
        height: "100vh", // Assuming full viewport height
        overflow: "hidden", // Hide overflowing content
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          transform: "translate(-50%, -40%)",
        }}
      >
        {foundTrap || notFoundCheese ? (
          <img
            src={catDance}
            alt="Cat Dancing"
            style={{
              width: "300px",
              height: "auto",
            }}
          />
        ) : (
          <img
            src={mouseDance}
            alt="Mouse Dancing"
            style={{
              width: "200px",
              height: "auto",
            }}
          />
        )}
      </div>
      <div style={{ marginRight: "15%", marginTop: "15%" }}>
        {/* 종료 후 역할 공개 */}
        {foundTrap || notFoundCheese ? (
          <h1 className="text-6xl text-amber-800 mb-10 mt-20 ">
            고양이 승! 이겨버렸다옹~
          </h1>
        ) : (
          <h1 className="text-4xl text-amber-800 mb-10 mt-20 ">
            쥐 승! 이겨버렸찍찍찍~
          </h1>
        )}
        {/* {gameData.gameUsers.map((player) => (
          <div key={player.memberId} className="flex">
            <h3 className="text-black text-3xl">{player.nickname} : </h3>
            <p className="text-blue text-3xl ml-5 mr-5 text-amber-800">
              {player.jobId === 0 ? "쥐" : "고양이"}
            </p>
          </div>
        ))}
        <button
          className="mt-5 text-xl py-3 px-6 rounded-md bg-opacity-50 bg-gray-300 text-black cursor-pointer transition duration-300 hover:bg-opacity-100 ml-5"
          onClick={() => navigate("/lobby")}
        >
          방 나가기
        </button> */}
        <div className="flex justify-between">
          <div className="mb-30 mr-8">
            <h2 className="text-blue-700 text-4xl mb-5">고양이 팀</h2>
            {gameData.gameUsers
              .filter((player) => player.jobId === 1)
              .map((catPlayer) => (
                <p key={catPlayer.memberId} className="text-blue text-3xl">
                  {catPlayer.nickname}
                </p>
              ))}
          </div>
          <div>
            <h2 className="text-blue-700 text-4xl mb-5">쥐 팀</h2>
            {gameData.gameUsers
              .filter((player) => player.jobId === 0)
              .map((mousePlayer) => (
                <p key={mousePlayer.memberId} className="text-blue text-3xl">
                  {mousePlayer.nickname}
                </p>
              ))}
          </div>
        </div>
        <div style={{ marginRight: "14%", marginTop: "5%" }}>
          <button
            className="text-xl py-3 px-6 rounded-md bg-opacity-50 bg-gray-300 text-black cursor-pointer transition duration-300 hover:bg-opacity-100 animate-pulse"
            onClick={() => navigate("/lobby")}
          >
            방 나가기
          </button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};
