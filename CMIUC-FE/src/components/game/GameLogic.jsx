import { useState, useEffect, createContext } from "react";
import Loading from "../Loading";
import { GameVideo } from "../game/GameVideo.jsx";
import { GameStartModal } from "../modals/GameStartModal.jsx";
import { GameFirstPlayerModal } from "../modals/GameFirstPlayerModal.jsx";
import { GamePlayerRoleModal } from "../modals/GamePlayerRoleModal.jsx";
import { GameRoundModal } from "../modals/GameRoundModal.jsx";
import { GameCardDealModal } from "../modals/GameCardDealModal.jsx";

export const UserContext = createContext();

export const GameLogic = () => {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState("GAME_START");
  const [modalState, setModalState] = useState(false);
  const [timer, setTimer] = useState(null);
  const [playerInfo, setPlayerInfo] = useState([
    {
      userID: 0,
      userName: "0",
      isFisrtPlayer: false,
      userRole: 0,
      userCard: [],
    },
  ]);
  const [round, setRound] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  if (loading) return <Loading />;

  return (
    <div>
      <UserContext.Provider value={{ playerInfo }}>
        {playerInfo.length >= 4 && <GameVideo />}
      </UserContext.Provider>
      {gameState === "GAME_START" && (
        <GameStartModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
      {gameState === "DRAW_FIRST_PLAYER" && (
        <GameFirstPlayerModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
          playerInfo={playerInfo}
          setPlayerInfo={setPlayerInfo}
        />
      )}
      {gameState === "ROUND" && (
        <GameRoundModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          round={round}
          setRound={setRound}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
      {gameState === "DRAW_PLAYER_ROLE" && (
        <GamePlayerRoleModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
          playerInfo={playerInfo}
          setPlayerInfo={setPlayerInfo}
        />
      )}
      {gameState === "CARD_DEAL" && (
        <UserContext.Provider value={{ playerInfo }}>
          <GameCardDealModal
            modalState={modalState}
            setModalState={setModalState}
            gameState={gameState}
            setGameState={setGameState}
            playerInfo={playerInfo}
            setPlayerInfo={setPlayerInfo}
          />
        </UserContext.Provider>
      )}
    </div>
  );
};
