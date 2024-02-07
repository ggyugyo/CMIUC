import { useState, useEffect, createContext } from "react";
import { redirect, useParams } from "react-router-dom";
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
import { CardInfoMap } from "../../map/game/CardInfoMap";
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
      state: 0,
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

  // NOTE : 객체의 value로 key를 찾는 함수
  const findKeyByValueInArray = (obj, value) => {
    for (const key in obj) {
      if (obj[key].find((target) => target === value)) {
        return key;
      }
    }
    return null; // 값을 찾지 못한 경우
  };

  const [userCount, setUserCount] = useState(0);
  const [ws, setWs] = useState(null);
  const { roomId } = useParams();
  const sender = localStorage.getItem("nickname");
  // axios 다 되면 소켓 연곃 하라고 합시다 (await 걸고 그래야 합니다??)
  const socket = new SockJS(`http://localhost:8081/ws-stomp`);
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
            newPlayerInfo = receivedMessage.data.roomUsers.map(
              (userData, _) => {
                return {
                  memberId: userData.memberId,
                  nickname: userData.nickname,
                  order: userData.order,
                  state: userData.state,
                  ready: userData.ready,
                };
              }
            );
            newPlayerInfo.sort((a, b) => a.memberId - b.memberId);
            console.log(newPlayerInfo);
            setPlayerInfo(newPlayerInfo);
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
            newPlayerInfo.sort((a, b) => a.memberId - b.memberId);
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
          let newDrawCard = null;
          switch (receivedMessage.type) {
            case "OPEN_CARD":
              setCurTurn(receivedMessage.data.curTurn);
              setGameState;
              console.log(receivedMessage.data.gameUsers);
              newDrawCard = receivedMessage.data.openCardNum;
              setDrawCard(newDrawCard);
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
              newPlayerInfo.sort((a, b) => a.memberId - b.memberId);
              console.log(newPlayerInfo);
              setPlayerInfo(newPlayerInfo);
              if (newDrawCard !== undefined) {
                console.log("테이블에 올릴 카드 입니다람쥐", newDrawCard);
                // NOTE : 클릭 이벤트를 통해 선택한 카드의 종류
                const cardTypeKey = findKeyByValueInArray(
                  CardInfoMap(playerInfo.length),
                  newDrawCard
                );
                // NOTE : 카드 종류에 따라 카드 타입을 업데이트
                setCardType({
                  ...cardType,
                  [cardTypeKey]: cardType[cardTypeKey].concat(newDrawCard),
                });
                // NOTE : 현재 라운드에 해당하는 roundCard에 카드 타입에 맞게 카드 추가
                setRoundCard({
                  ...roundCard,
                  [round - 1]: {
                    ...roundCard[round - 1],
                    [cardTypeKey]:
                      roundCard[round - 1][cardTypeKey].concat(newDrawCard),
                  },
                });
                // NOTE : 테이블 카드 배열을 복사
                let newTableCard = [...tableCard];
                // NOTE : 테이블 카드 배열에 클릭 이벤트를 통해 선택한 카드를 추가
                newTableCard = newTableCard.concat(newDrawCard);
                // 새로운 테이블 카드 배열을 업데이트
                setTableCard(newTableCard);
              }
              break;

            case "NEW_ROUND_SET":
              setRound(receivedMessage.data.round);
              setTableCard([]);
              setGameState("ROUND");
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
              newPlayerInfo.sort((a, b) => a.memberId - b.memberId);
              console.log(newPlayerInfo);
              setPlayerInfo(newPlayerInfo);
              break;
          }
        });
      });
    }
  }, [gameId, drawCard]);

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
      {roomId !== "" ? <GameVideo /> : null}
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
