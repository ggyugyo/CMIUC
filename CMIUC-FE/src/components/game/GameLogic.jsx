import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { BASE_URL } from "../../api/url/baseURL.js";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";
import Loading from "../etc/Loading.jsx";
import { GameVideo } from "../game/GameVideo.jsx";
import { GameReadyButton } from "./GameReadyButton.jsx";
import { GameStartModal } from "../modals/GameStartModal.jsx";
// import { GameFirstPlayerModal } from "../modals/GameFirstPlayerModal.jsx";
// import { GamePlayerRoleModal } from "../modals/GamePlayerRoleModal.jsx";
import { GamePlayerRoleModal } from "../modals/GamePlayerRoleModal.jsx";
import { GameRoundModal } from "../modals/GameRoundModal.jsx";
// import { GameCardDealModal } from "../modals/GameCardDealModal.jsx";
import { GamePlayerCard } from "../game/GamePlayerCard";
// import { CardInfoMap } from "../../map/game/CardInfoMap";
import { GameTableCard } from "./GameTableCard.jsx";
import { GameBoard } from "./GameBoard.jsx";
import { GameChat } from "./GameChat.jsx";
import { GameHistory } from "./GameHistory.jsx";
import { GameMyCardListModal } from "../modals/GameMyCardListModal.jsx";
import { GameEndModal } from "../modals/GameEndModal.jsx";
import { useSocket } from "../../settings/SocketContext.jsx";
import { ViduContext } from "../../pages/Game.jsx";
import { GameEventModal } from "../modals/GameEventModal.jsx";
import { PreventSetting } from "../../settings/PreventSetting.jsx";

export const GameContext = createContext();

export const GameLogic = () => {
  const { client } = useSocket();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [readyOn, setReadyOn] = useState(false);
  const [gameState, setGameState] = useState("WAIT");
  const [eventState, setEventState] = useState(null);
  const [gameData, setGameData] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [timer, setTimer] = useState(null);
  const [checkMyCards, setCheckMyCards] = useState(false);
  const [conditionFlag, setConditionFlag] = useState(true);
  // const [interuptFlag, setInteruptFlag] = useState(true);
  const [round, setRound] = useState(1);
  const [cardType, setCardType] = useState({
    CHEESE: [],
    TRAP: [],
    EMPTY: [],
    ACTION: [],
  });

  {
    /* 소 == 켓 == 통 == 신 */
  }
  const [gameId, setGameId] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();
  const sender = localStorage.getItem("nickname");

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
      let newMessage;
      switch (receivedMessage.type) {
        case "ENTER":
          newMessage = receivedMessage.data.message;
          newGameData = receivedMessage.data;
          setMessages((prev) => [
            ...prev,
            {
              sender: receivedMessage.data?.sender,
              message: newMessage,
            },
          ]);
          setGameData(newGameData);
          break;

        case "READY":
          newGameData = receivedMessage.data;
          setGameData({ gameUsers: newGameData });
          break;

        case "ROOM_CUR_USERS":
          newGameData = receivedMessage.data;
          setGameData({ gameUsers: newGameData });
          break;

        case "EXIT":
          newMessage = receivedMessage.data;
          setMessages((prev) => [
            ...prev,
            {
              sender: receivedMessage.data?.sender,
              message: newMessage,
            },
          ]);

        case "START":
          console.log("===== 게임 시작 =====");
          setGameId(receivedMessage.data.gamePlayDTO.gameId);
          newGameData = receivedMessage.data;
          setGameData(newGameData);
          setGameState("GAME_START");
          break;
      }
    });
  };

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
          setGameState("EVENT_OCCUR");
          setEventState("MUTE_OFF");
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "CHOICE_ALL_TURN":
          setGameState("EVENT_OCCUR");
          setEventState("CHOICE_ALL_TURN");
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "CAN_SEE_CARD":
          setGameState("EVENT_OCCUR");
          setEventState("CAN_SEE_CARD");
          // 모달 띄우고 00 님은 보고 싶은 카드를 한장 선택할 수 있습니다.
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "SEE_CARD":
          setGameState("EVENT_OCCUR");
          setEventState("SEE_CARD");
          // 모달이 뜨면서 모든 유저에게 그 카드 정보 보여주기!
          newGameData = receivedMessage.data;
          setGameData(newGameData);
          break;

        case "DELETE_CHEEZE_CARD":
          setGameState("EVENT_OCCUR");
          setEventState("DELETE_CHEEZE_CARD");
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setConditionFlag(true);
          break;

        case "DELETE_USER_CARDS":
          newGameData = receivedMessage.data;
          console.log(newGameData);
          setGameData(newGameData);
          setGameState("EVENT_OCCUR");
          setEventState("DELETE_USER_CARDS");
          setConditionFlag(true);
          break;

        case "SHOW_JOB":
          newGameData = receivedMessage.data;
          setGameData(newGameData);
          setGameState("EVENT_OCCUR");
          setEventState("SHOW_JOB");
          console.log(newGameData);
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
                gameData,
                roomId: roomId,
              },
            });
            leaveSession();
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
                gameData,
                roomId: roomId,
              },
            });
            leaveSession();
          }, 4000);
          break;
      }
    });
  };

  const findKeyByValueInArray = (obj, value) => {
    for (const key in obj) {
      if (obj[key].find((target) => target === value)) {
        return key;
      }
    }
    return undefined;
  };

  const enterRoom = () => {
    client?.publish({
      destination: `/pub/games/room/${roomId}`,
      headers: headers(),
    });
  };

  const isReady = (readyState) => {
    client?.publish({
      destination: `/pub/games/${roomId}/ready`,
      headers: headers(),
      body: JSON.stringify({
        memberId: localStorage.getItem("id"),
        readyOn: readyState,
      }),
    });
  };

  // const interuptMute = () => {
  //   if (interuptFlag === true && gameState === "DRAW_CARD") {
  //     setInteruptFlag((prev) => {
  //       return !prev;
  //     });
  //     const muteUser = [...gameData.gameUsers].find((user) => {
  //       if (user.cards.includes(1)) {
  //         return user;
  //       } else return undefined;
  //     });

  //     if (!!muteUser) {
  //       setGameState("EVENT_OCCUR");
  //       setEventState("MUTE");
  //     }
  //   }
  // };

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

  useEffect(() => {
    if (gameId !== "") {
      subGame();
    }
  }, [gameId]);

  useEffect(() => {
    // interuptMute();
    setTimeout(() => {
      if (gameState === "DRAW_CARD" && conditionFlag) {
        if (
          gameData.gamePlayDTO.cheezeCnt === gameData.gameUsers.length ||
          gameData.gamePlayDTO.mousetrap === 1 ||
          (gameData.gamePlayDTO.tableCards.length ===
            gameData.gameUsers.length &&
            gameData.gamePlayDTO.curRound === 4)
        ) {
          if (
            gameData.gamePlayDTO.curTurn === Number(localStorage.getItem("id"))
          ) {
            console.log("===== 게임 끝 =====");
            setConditionFlag((prev) => !prev);
            flagEndGame();
          }
        } else if (
          gameData.gamePlayDTO.tableCards.length === gameData.gameUsers.length
        ) {
          if (
            gameData.gamePlayDTO.curTurn === Number(localStorage.getItem("id"))
          ) {
            console.log("===== 다음 라운드 =====");
            setConditionFlag((prev) => {
              return !prev;
            });
            // setInteruptFlag((prev) => {
            //   return !prev;
            // });
            flagNextRound();
          }
        }
      }
    }, 1000);
  }, [gameData, gameState]);

  const { leaveSession } = useContext(ViduContext);

  useEffect(() => {
    subRoom();
    enterRoom();

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      leaveSession();
      unSubRoom();
      unSubGame();
    };
  }, []);

  PreventSetting();

  if (loading) return <Loading />;

  return (
    <GameContext.Provider
      value={{
        readyOn,
        setReadyOn,
        modalState,
        setModalState,
        gameState,
        setGameState,
        gameData,
        headers,
        eventState,
        setEventState,
      }}
    >
      <GameChat
        sender={sender}
        roomId={roomId}
        messages={messages}
        setMessages={setMessages}
      />
      {gameState === "WAIT" && <GameReadyButton isReady={isReady} />}
      {!loading && <GameVideo />}

      <GameBoard unSubRoom={unSubRoom} leaveSession={leaveSession} />

      {(gameState === "DRAW_CARD" ||
        gameState === "GAME_END" ||
        gameState === "EVENT_OCCUR") && <GamePlayerCard />}
      {(gameState === "DRAW_CARD" ||
        gameState === "GAME_END" ||
        gameState === "EVENT_OCCUR") && (
        <GameTableCard cardType={cardType} setCardType={setCardType} />
      )}
      {(gameState === "DRAW_CARD" ||
        gameState === "GAME_END" ||
        gameState === "EVENT_OCCUR") && (
        <GameHistory modalState={modalState} setModalState={setModalState} />
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
      {gameState === "PLAYER_ROLE" && (
        <GamePlayerRoleModal
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
          // interuptMute={interuptMute}
        />
      )}
      {gameState === "EVENT_OCCUR" && (
        <GameEventModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
          setGameState={setGameState}
        />
      )}
      {(gameState === "DRAW_CARD" ||
        gameState === "GAME_END" ||
        gameState === "EVENT_OCCUR") && (
        <GameMyCardListModal
          checkMyCards={checkMyCards}
          setCheckMyCards={setCheckMyCards}
        />
      )}
      {gameState === "GAME_END" && (
        <GameEndModal
          modalState={modalState}
          setModalState={setModalState}
          timer={timer}
          setTimer={setTimer}
          gameState={gameState}
        />
      )}
    </GameContext.Provider>
  );
};
