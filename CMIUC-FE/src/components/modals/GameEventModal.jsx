import Modal from "react-modal";
import { useEffect, useContext } from "react";
import { GameContext } from "../game/GameLogic";
import { GameTimer } from "../game/GameTimer";
import { motion } from "framer-motion";
import { CardInfoMap } from "../../map/game/CardInfoMap";
import mute from "../../assets/image/game/mute.gif";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    width: "100vw",
    height: "100vh",
  },
  content: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto auto",
    width: "550px",
    height: "550px",
    borderRadius: "20px",
  },
};

export const GameEventModal = ({
  modalState,
  setModalState,
  timer,
  setTimer,
  gameState,
  setGameState,
}) => {
  const { gameData, eventState, setEventState } = useContext(GameContext);

  useEffect(() => {
    setModalState(true);
  }, []);

  let title = "";
  let content = "";
  let myId = localStorage.getItem("id");

  const findKeyByValueInArray = (obj, value) => {
    for (const key in obj) {
      if (obj[key].find((target) => target === value)) {
        return key;
      }
    }
    return undefined;
  };

  switch (eventState) {
    case "MUTE":
      const muteUser = [...gameData.gameUsers].find((user) => {
        if (user.cards.includes(1)) {
          return user;
        }
      });
      title = "침묵하라 이것아!";

      content = `${
        muteUser.memberId === Number(myId)
          ? "당신은 침묵을 유지해야 합니다!"
          : "누군가 이번 라운드에서 침묵을 유지해야 합니다!"
      }`;
      break;

    case "MUTE_OFF":
      const muteOffUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      title = `${muteOffUser.nickname}님의 침묵이 풀렸습니다!`;
      break;

    case "CHOICE_ALL_TURN":
      title = "나만 믿어";
      const choiceUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      content = `${choiceUser.nickname}님 행운을 빕니다!! 이번 라운드 동안 이 카드를 가지고 있던 당신의 차례가 계속 됩니다.`;
      break;

    case "CAN_SEE_CARD":
      title = "카드를 확인하세요!";
      let seeCardUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      content = `${seeCardUser.nickname}님 원하는 카드를 1장 공개한 뒤, 다시 뒷면으로 뒤집습니당 의심스러운 카드를 시원하게 까보세용~`;
      break;

    case "SEE_CARD":
      let revealCardUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      title = `${revealCardUser.nickname}님의 선택!`;
      const _key = findKeyByValueInArray(
        CardInfoMap(gameData.gameUsers.length),
        gameData.gamePlayDTO.openCardNum
      );
      content = `${_key} 카드를 선택했습니다!`;
      break;

    case "DELETE_CHEEZE_CARD":
      title = "뭐야 어디갔어 아으 여아정";
      content =
        "당신이 쥐라면 유유, 고양이라면 촤핫 테이블 가운데에 있는 치즈 한 개를 다시 카드 더미에 되돌립니다.";
      break;

    case "DELETE_USER_CARDS":
      title = "집주인의 그림자";
      const cardDeleteUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      content = `로봇청소기가 지나갔어요!! 유유 공개되지 않은 ${cardDeleteUser.nickname}님의 카드를 모두 카드 더미에 넣습니당.`;
      break;

    case "SHOW_JOB":
      title = "내가 뭐~게";
      const watchUserId = gameData.gameActionDTO.showJobDTO.watchMemberId;
      // 여기 오타
      const showUserId = gameData.gameActionDTO.showJobDTO.showMemeberId;
      const userList = [];
      [...gameData.gameUsers].forEach((user) => {
        switch (user.memberId) {
          case watchUserId:
            userList.unshift(user);
            break;
          case showUserId:
            userList.push(user);
            break;
        }
      });
      console.log(watchUserId, showUserId, userList);
      content = userList.map((user) => {
        if (user.memberId === watchUserId && user.memberId === myId) {
          return `${user.nickname}님의 직업은 ${
            user.jobId === 1 ? "고양이" : "쥐"
          } 입니다!`;
        } else if (user.memberId === showUserId && user.memberId === myId) {
          return `당신의 정체가 ${user.nickname}님에게 공개됩니다!`;
        } else {
          return `${userList[1].nickname}님의 정체가 ${userList[0].nickname}님에게 공개됩니다!`;
        }
      });

      console.log(content);
      break;
  }

  useEffect(() => {
    if (timer === 0) {
      setModalState(false);
      setGameState("DRAW_CARD");
      setTimer(null);
      setEventState(null);
    }
  }, [timer]);

  return (
    <Modal
      isOpen={modalState}
      shouldCloseOnOverlayClick={false}
      ariaHideApp={false}
      overlayElement={(props, overlayElement) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          {...props}
        >
          {overlayElement}
        </motion.div>
      )}
      style={customStyles}
      onRequestClose={() => {
        setModalState(false);
      }}
    >
      <div className="text-[30px]">{title}</div>
      {eventState === "MUTE" && (
        <div>
          <div className="flex justify-center w-[200px] h-[200px]">
            <img className="w-[150px] h-[150px]" src={mute} />
          </div>
          <div className="text-[20px]">{content}</div>
        </div>
      )}
      {eventState === "CHOICE_ALL_TURN" && (
        <div className="text-[20px]">{content}</div>
      )}
      {eventState === "CAN_SEE_CARD" && (
        <div className="text-[20px]">{content}</div>
      )}
      {eventState === "SEE_CARD" && (
        <div className="text-[20px]">{content}</div>
      )}
      {eventState === "DELETE_CHEEZE_CARD" && (
        <div className="text-[20px]">{content}</div>
      )}
      {eventState === "DELETE_USER_CARDS" && (
        <div className="text-[20px]">{content}</div>
      )}
      {eventState === "SHOW_JOB" && (
        <div className="text-[20px]">{content}</div>
      )}
      <GameTimer timer={timer} setTimer={setTimer} gameState={gameState} />
    </Modal>
  );
};
