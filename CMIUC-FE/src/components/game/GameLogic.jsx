import { useState, useEffect, createContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../api/url/baseURL.js";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Loading from "../etc/Loading.jsx";
import { GameVideo } from "../game/GameVideo.jsx";
import { GameReadyButton } from "./GameReadyButton.jsx";
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
import { GameEndModal } from "../modals/GameEndModal.jsx";

import { useSocket } from "../../settings/SocketContext.jsx";

export const GameContext = createContext();

export const GameLogic = ({
  mainStreamManager,
  subscribers,
  setSelfCamera,
  setSelfMic,
  setUserVideo,
  setUserAudio,
  leaveSession,
}) => {
  const { client } = useSocket();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [readyOn, setReadyOn] = useState(false);
  const [gameState, setGameState] = useState("WAIT");
  const [gameData, setGameData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [timer, setTimer] = useState(null);
  const [conditionFlag, setConditionFlag] = useState(true);
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
  const [messages, setMessages] = useState([]);
  const [drawCard, setDrawCard] = useState(null);
  const [token, setToken] = useState("");

  const [ws, setWs] = useState(null);
  const { roomId } = useParams();
  const sender = localStorage.getItem("nickname");
  // axios 다 되면 소켓 연곃 하라고 합시다 (await 걸고 그래야 합니다??)
  const socket = new SockJS(`${BASE_URL}/ws-stomp`);
  const stompClient = Stomp.over(socket);
  stompClient.reconnect_delay = 5000;

  const headers = () => {
    return {
      accessToken: localStorage.getItem("accessToken"),
    };
  };

  const subRoom = () => {
    client?.subscribe(`/sub/games/wait/${roomId}`, (message) => {
      console.log(`=====방 구독 : ${roomId}=====`);
      const receivedMessage = JSON.parse(message.body);
      console.log(receivedMessage);
      let newGameData;
      switch (receivedMessage.type) {
        case "ENTER":
          const newMessage = receivedMessage.data.message;
          newGameData = receivedMessage.data;
          setMessages((prev) => [
            ...prev,
            {
              sender: receivedMessage.data.sender,
              message: newMessage,
            },
          ]);
          setGameData(newGameData);
          break;

        case "START":
          console.log("===== 게임 시작 =====");
          setGameState("GAME_START");
          setGameId(receivedMessage.data.gamePlayDTO.gameId);
          newGameData = receivedMessage.data;
          setGameData(newGameData);
          // setGameId(receivedMessage.data.gamePlayDTO.gameId);
          // setCurTurn(receivedMessage.data.gamePlayDTO.curTurn);
          // console.log(receivedMessage.data.gameUsers);
          // let newPlayerInfo = receivedMessage.data.gameUsers.map(
          //   (userData, _) => {
          //     return {
          //       memberId: userData.memberId,
          //       nickname: userData.nickname,
          //       order: userData.order,
          //       jobId: userData.jobId,
          //       cards: [...userData.cards],
          //     };
          //   }
          // );
          // newPlayerInfo.sort((a, b) => a.memberId - b.memberId);
          // console.log(newPlayerInfo);
          // setPlayerInfo(newPlayerInfo);
          break;
      }
    });
  };

  // const connectRoom = () => {
  //   stompClient.connect({}, () => {
  //     console.log("===== 방 연결 성공 =====");
  //     stompClient.subscribe(`/sub/games/wait/${roomId}`, (message) => {
  //       const receivedMessage = JSON.parse(message.body);
  //       console.log(receivedMessage.type);
  //       let newPlayerInfo = [];
  //       switch (receivedMessage.type) {
  //         case "ENTER":
  //           setMessages((prevMessages) => [
  //             ...prevMessages,
  //             {
  //               sender: receivedMessage.data.sender,
  //               message: receivedMessage.data.message,
  //             },
  //           ]);
  //           newPlayerInfo = receivedMessage.data.roomUsers.map(
  //             (userData, _) => {
  //               return {
  //                 memberId: userData.memberId,
  //                 nickname: userData.nickname,
  //                 order: userData.order,
  //                 state: userData.state,
  //                 ready: userData.ready,
  //               };
  //             }
  //           );
  //           newPlayerInfo.sort((a, b) => a.memberId - b.memberId);
  //           console.log(newPlayerInfo);
  //           setPlayerInfo(newPlayerInfo);
  //           break;

  //         case "START":
  //           setGameState("GAME_START");
  //           setGameId(receivedMessage.data.gamePlayDTO.gameId);
  //           setCurTurn(receivedMessage.data.gamePlayDTO.curTurn);
  //           console.log(receivedMessage.data.gameUsers);
  //           newPlayerInfo = receivedMessage.data.gameUsers.map(
  //             (userData, _) => {
  //               return {
  //                 memberId: userData.memberId,
  //                 nickname: userData.nickname,
  //                 order: userData.order,
  //                 jobId: userData.jobId,
  //                 cards: [...userData.cards],
  //               };
  //             }
  //           );
  //           newPlayerInfo.sort((a, b) => a.memberId - b.memberId);
  //           console.log(newPlayerInfo);
  //           setPlayerInfo(newPlayerInfo);
  //           break;
  //       }
  //       // setPlayerInfo(receivedMessage.data.members);
  //     });

  //     enterRoom();
  //   });
  // };

  const subGame = () => {
    console.log(`=====게임 구독 : ${gameId}=====`);
    client?.subscribe(`/sub/games/play/${gameId}`, (message) => {
      const receivedMessage = JSON.parse(message.body);

      console.log(receivedMessage);

      let newGameData;
      switch (receivedMessage.type) {
        case "OPEN_CARD":
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "MUTE_OFF":
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "CHOICE_ALL_TURN":
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "CAN_SEE_CARD":
          // 모달 띄우고 00 님은 보고 싶은 카드를 한장 선택할 수 있습니다.
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "SEE_CARD":
          // 모달이 뜨면서 모든 유저에게 그 카드 정보 보여주기!
          console.log("SEE_CARD", receivedMessage.data);
          break;

        case "DELETE_CHEEZE_CARD":
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "DELETE_USER_CARDS":
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "SHOW_JOB":
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "NEW_ROUND_SET":
          setTimeout(() => {
            newGameData = receivedMessage.data;
            setGameData(newGameData);
            setRound(receivedMessage.data.gamePlayDTO.curRound);
            setGameState("ROUND");
          }, 2000);

          break;

        case "GAME_END_MOUSE_WIN":
          newGameData = receivedMessage.data;
          setGameData(newGameData);
          setTimeout(() => {
            setGameState("GAME_END");
          }, 2000);
          setTimeout(() => {
            navigate("/result", {
              state: {
                result: "MOUSE_WIN",
                playerInfo: gameData.gameUsers,
                roomId: roomId,
              },
            });
          }, 4000);
          break;

        case "GAME_END_CAT_WIN":
          newGameData = receivedMessage.data;
          setGameData(newGameData);
          setTimeout(() => {
            setGameState("GAME_END");
          }, 2000);
          setTimeout(() => {
            navigate("/result", {
              state: {
                result: "CAT_WIN",
                playerInfo: gameData.gameUsers,
                roomId: roomId,
              },
            });
          }, 4000);
          break;
      }
    });
  };

  // const enterRoom = () => {
  //   stompClient.send(`/pub/games/room/${roomId}`, headers());
  // };

  const enterRoom = () => {
    client?.publish({
      destination: `/pub/games/room/${roomId}`,
      headers: headers(),
    });
  };

  const isReady = () => {
    client?.publish({
      destination: `/pub/games/${roomId}/ready`,
      headers: headers(),
      body: JSON.stringify({
        memberId: localStorage.getItem("id"),
        readyOn: readyOn,
      }),
    });
  };

  const flagNextRound = () => {
    client?.publish({
      destination: `/pub/games/${gameId}/new-round`,
      headers: headers(),
      body: JSON.stringify({}),
    });
  };

  const flagEndGame = () => {
    client?.publish({
      destination: `/pub/games/${gameId}/game-end`,
      headers: headers(),
      body: JSON.stringify({}),
    });
  };

  const unSubRoom = () => {
    client?.publish({
      destination: `/pub/games/room/${roomId}/exit`,
      headers: headers(),
      body: JSON.stringify({ memberId: localStorage.getItem("id") }),
    });
    console.log("====== 방 나가기 ======");
    client?.unsubscribe(`/sub/games/wait/${roomId}`);
  };

  const unSubGame = () => {
    console.log("====== 게임 구독 취소 ======");
    client?.unsubscribe(`/sub/games/play/${gameId}`);
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

  useEffect(() => {
    if (gameId !== "") {
      subGame();
    }
  }, [gameId]);

  useEffect(() => {
    setTimeout(() => {
      if (gameState === "DRAW_CARD" && conditionFlag) {
        if (
          gameData.gamePlayDTO.cheezeCnt === gameData.gameUsers.length ||
          gameData.gamePlayDTO.mousetrap === 1 ||
          (gameData.gamePlayDTO.tableCards.length ===
            gameData.gameUsers.length &&
            gameData.gamePlayDTO.curRound === 4)
        ) {
          console.log("게임 끝");
          setConditionFlag((prev) => !prev);
          flagEndGame();
        } else if (
          gameData.gamePlayDTO.tableCards.length === gameData.gameUsers.length
        ) {
          console.log("넘어가라 라운드");
          setConditionFlag((prev) => !prev);
          flagNextRound();
        }
      }
    }, 1000);
  }, [gameData]);

  useEffect(() => {
    subRoom();
    enterRoom();

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      unSubRoom();
      unSubGame();
      leaveSession();
    };
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
        gameData,
        headers,
      }}
    >
      <GameChat
        sender={sender}
        roomId={roomId}
        messages={messages}
        setMessages={setMessages}
      />
      {gameState === "WAIT" && <GameReadyButton isReady={isReady} />}
      {roomId !== "" ? (
        <GameVideo
          mainStreamManager={mainStreamManager}
          subscribers={subscribers}
          setSelfCamera={setSelfCamera}
          setSelfMic={setSelfMic}
          setUserVideo={setUserVideo}
          setUserAudio={setUserAudio}
        />
      ) : null}

      <GameBoard exit={unSubRoom} />

      {(gameState === "DRAW_CARD" || gameState === "GAME_END") && (
        <GamePlayerCard />
      )}
      {(gameState === "DRAW_CARD" || gameState === "GAME_END") && (
        <GameTableCard cardType={cardType} setCardType={setCardType} />
      )}
      {(gameState === "DRAW_CARD" || gameState === "GAME_END") && (
        <GameHistory />
      )}
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
      {gameState === "GAME_END" && (
        <GameEndModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
        ></GameEndModal>
      )}
    </GameContext.Provider>
  );
};
