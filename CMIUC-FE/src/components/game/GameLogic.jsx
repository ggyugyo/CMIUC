import { useEffect, useState } from "react";
import Loading from "../Loading.jsx";
import Modal from "react-modal";
import { GameStart } from "./GameStart.jsx";
import { GameFirstPlayer } from "./GameFirstPlayer.jsx";
import { GamePlayerRole } from "./GamePlayerRole";

export const GameLogic = () => {
  const [loading, setLoading] = useState(true);
  // 게임 상태 관리
  const [gameState, setGameState] = useState("WAITING");
  // 유저 정보 Default
  const [playerInfo, setPlayerInfo] = useState([
    {
      userName: 0,
      isFisrtPlayer: false,
      userRole: 0,
      userCard: [],
    },
  ]);
  // 게임 시작 모달
  const [gameStartModal, setGameStartModal] = useState(false);
  // 게임 참가자 수
  const [playerNumber, setPlayerNumber] = useState(0);
  // 선카드 모달
  const [firstPlayerModal, setFirstPlayerModal] = useState(false);
  // 역할선정 모달
  const [playerRoleModal, setPlayerRoleModal] = useState(false);
  // 라운드
  const [round, setRound] = useState(0);
  // 타이머
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setGameState("GAME_START");
      setGameStartModal(true);
    }, 2000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {gameState === "GAME_START" && (
        <GameStart
          gameState={gameState}
          setGameState={setGameState}
          gameStartModal={gameStartModal}
          setGameStartModal={setGameStartModal}
        />
      )}
      {/* <GameFirstPlayer
        gameState={gameState}
        setGameState={setGameState}
        playerNumber={playerNumber}
        setPlayerNumber={setPlayerNumber}
        playerInfo={playerInfo}
        setPlayerInfo={setPlayerInfo}
        setFirstPlayerModal={setFirstPlayerModal}
        setRoundAlert={setRoundAlert}
      />
      <Modal
        isOpen={roundAlert}
        ariaHideApp={false}
        onRequestClose={roundTimer()}
      >
        {round}
      </Modal>
      {gameState === "DRAWROLE" && (
        <GamePlayerRole
          playerRoleModal={playerRoleModal}
          setPlayerRoleModal={setPlayerRoleModal}
          playerInfo={playerInfo}
          setPlayerInfo={setPlayerInfo}
        />
      )} */}
    </div>
  );
};
