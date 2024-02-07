import { useState, useEffect, createContext } from "react";
import { redirect, useParams } from "react-router-dom";
import { BASE_URL } from "../../api/url/baseURL.js";
import { BASE_URL } from "../../api/url/baseURL.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
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
import { GameReadyButton } from "./GameReadyButton.jsx";

export const GameContext = createContext();

export const GameLogic = () => {
  const [loading, setLoading] = useState(true);
  const [readyOn, setReadyOn] = useState(false);
  const [gameState, setGameState] = useState("WAIT");
  const [modalState, setModalState] = useState(false);
  const [timer, setTimer] = useState(null);
  const [playerInfo, setPlayerInfo] = useState([
    {
      memberId: 0,
      nickname: "",
      order: 0,
      jobId: 0,
      cards: [],
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
    {
      CHEESE: [],
      TRAP: [],
      EMPTY: [],
      ACTION: [],
    },
  ]);

  {
    /* 소 == 켓 == 통 == 신 */
  }
  const [gameId, setGameId] = useState("");
  const [curTurn, setCurTurn] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [drawCard, setDrawCard] = useState(null);
  const [token, setToken] = useState("");
  const headers = () => {
    return {
      accessToken: localStorage.getItem("accessToken"),
    };
  };

  const [userCount, setUserCount] = useState(0);
  const [ws, setWs] = useState(null);
  const { roomId } = useParams();
  const sender = localStorage.getItem("nickname");
  // axios 다 되면 소켓 연곃 하라고 합시다 (await 걸고 그래야 합니다??)
  const socket = new SockJS(`${BASE_URL}/ws-stomp`);
  const stompClient = Stomp.over(socket);

  const connectRoom = () => {
    stompClient.connect({}, () => {
      console.log("===== 방 연결 성공 =====");
      stompClient.subscribe(`/sub/games/wait/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log(receivedMessage.type);
        let newPlayerInfo = [];
        switch (receivedMessage.type) {
          case "ENTER":
            setMessages((prevMessages) => [
              ...prevMessages,
              {
                sender: receivedMessage.data.sender,
                message: receivedMessage.data.message,
              },
            ]);
            break;
          case "START":
            setGameState("GAME_START");
            setGameId(receivedMessage.data.gameId);
            setCurTurn(receivedMessage.data.curTurn);
            console.log(receivedMessage.data.gameUsers);
            newPlayerInfo = receivedMessage.data.gameUsers.map(
              (userData, _) => {
                return {
                  memberId: userData.memberId,
                  nickname: userData.nickname,
                  order: userData.order,
                  jobId: userData.jobId,
                  cards: [...userData.cards],
                };
              }
            );
            newPlayerInfo.sort((a, b) => a.order - b.order);
            console.log(newPlayerInfo);
            setPlayerInfo(newPlayerInfo);
            break;
        }
        // setPlayerInfo(receivedMessage.data.members);
      });
      enterRoom();
    });
  };

  useEffect(() => {
    if (gameId !== "") {
      stompClient.connect({}, () => {
        console.log("===== 게임 카드  =====");

        stompClient.subscribe(`/sub/games/play/${gameId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
          let newPlayerInfo = [];
          switch (receivedMessage.type) {
            case "OPEN_CARD":
              setCurTurn(receivedMessage.data.curTurn);
              console.log(receivedMessage.data.gameUsers);
              setDrawCard(receivedMessage.data.openCardNum);
              newPlayerInfo = receivedMessage.data.gameUsers.map(
                (userData, _) => {
                  return {
                    memberId: userData.memberId,
                    nickname: userData.nickname,
                    order: userData.order,
                    jobId: userData.jobId,
                    cards: [...userData.cards],
                  };
                }
              );
              newPlayerInfo.sort((a, b) => a.order - b.order);
              console.log(newPlayerInfo);
              setPlayerInfo(newPlayerInfo);
              break;
          }
        });
      });
    }
  }, [gameId]);

  const memberReady = (ReadyState) => {
    stompClient.send(
      `/pub/games/${roomId}/ready`,
      { accessToken: localStorage.getItem("accessToken") },
      JSON.stringify({
        memberId: localStorage.getItem("id"),
        readyOn: ReadyState,
      })
    );
  };

  const enterRoom = () => {
    stompClient.send(`/pub/games/room/${roomId}`, {
      accessToken: localStorage.getItem("accessToken"),
    });
  };

  useEffect(() => {
    connectRoom();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return <Loading />;

  return (
    <GameContext.Provider
      value={{
        stompClient,
        readyOn,
        setReadyOn,
        gameState,
        setGameState,
        gameId,
        setGameId,
        curTurn,
        setCurTurn,
        playerInfo,
        setPlayerInfo,
        round,
        setRound,
        drawCard,
        setDrawCard,
        tableCard,
        setTableCard,
        cardType,
        setCardType,
        roundCard,
        setRoundCard,
      }}
    >
      <GameChat
        sender={sender}
        roomId={roomId}
        messages={messages}
        setMessages={setMessages}
      />
      {gameState === "WAIT" && <GameReadyButton memberReady={memberReady} />}
      {playerInfo.length >= 4 && <GameVideo />}
      {gameState === "DRAW_CARD" && (
        <GameBoard cardType={cardType} timer={timer} />
      )}
      {gameState === "DRAW_CARD" && <GamePlayerCard />}
      {gameState === "DRAW_CARD" && (
        <GameTableCard cardType={cardType} setCardType={setCardType} />
      )}
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
      {/*
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
      )} */}
    </GameContext.Provider>
  );
};
