import { useState, useEffect, createContext } from "react";
import Loading from "../etc/Loading.jsx";
import { GameVideo } from "../game/GameVideo.jsx";
import { GameStartModal } from "../modals/GameStartModal.jsx";
import { GameFirstPlayerModal } from "../modals/GameFirstPlayerModal.jsx";
import { GamePlayerRoleModal } from "../modals/GamePlayerRoleModal.jsx";
import { GameRoundModal } from "../modals/GameRoundModal.jsx";
import { GameCardDealModal } from "../modals/GameCardDealModal.jsx";
import { GamePlayerCard } from "../game/GamePlayerCard";
import { GameTableCard } from "./GameTableCard.jsx";
import { GameBoard } from "./GameBoard.jsx";
import { GameChat } from "./GameChat.jsx";
import { GameHistory } from "./GameHistory.jsx";

export const GameContext = createContext();

export const GameLogic = () => {
  const [loading, setLoading] = useState(true);
  const [gameState, setGameState] = useState("GAME_START");
  const [modalState, setModalState] = useState(false);
  const [timer, setTimer] = useState(null);
  const [playerInfo, setPlayerInfo] = useState([
    {
      userID: 0,
      userName: "0",
      isFirstPlayer: false,
      userRole: 0,
      userCard: [],
    },
  ]);
  const [round, setRound] = useState(1);
  const [initCardDeck, setInitCardDeck] = useState([]);
  const [tableCard, setTableCard] = useState([]);
  const [cardType, setCardType] = useState({
    CHEESE: [],
    TRAP: [],
    EMPTY: [],
    ACTION: [],
  });
  const [roundCard, setRoundCard] = useState([
    {
      CHEESE: [],
      TRAP: [],
      EMPTY: [],
      ACTION: [],
    },
    {
      CHEESE: [],
      TRAP: [],
      EMPTY: [],
      ACTION: [],
    },
    {
      CHEESE: [],
      TRAP: [],
      EMPTY: [],
      ACTION: [],
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });

  if (loading) return <Loading />;

  return (
    <GameContext.Provider
      value={{
        gameState,
        setGameState,
        playerInfo,
        setPlayerInfo,
        round,
        setRound,
        tableCard,
        setTableCard,
        cardType,
        setCardType,
        roundCard,
        setRoundCard,
      }}
    >
      {playerInfo.length >= 4 && <GameVideo />}
      {gameState === "DRAW_CARD" && (
        <GameBoard cardType={cardType} timer={timer} />
      )}
      {gameState === "DRAW_CARD" && <GamePlayerCard />}
      {gameState === "DRAW_CARD" && (
        <GameTableCard cardType={cardType} setCardType={setCardType} />
      )}
      {gameState === "DRAW_CARD" && <GameChat />}
      {gameState === "DRAW_CARD" && <GameHistory />}
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
      {gameState === "CARD_DEAL" && (
        <GameCardDealModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
          setPlayerInfo={setPlayerInfo}
          initCardDeck={initCardDeck}
          setInitCardDeck={setInitCardDeck}
        />
      )}
    </GameContext.Provider>
  );
};
