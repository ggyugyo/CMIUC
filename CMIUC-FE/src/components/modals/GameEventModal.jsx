import Modal from "react-modal";
import { useEffect, useContext } from "react";
import { GameContext } from "../game/GameLogic";
import { GameTimer } from "../game/GameTimer";
import { motion } from "framer-motion";
import { CardInfoMap } from "../../map/game/CardInfoMap";
// import mute from "../../assets/image/game/mute.gif";
import action1 from "../../assets/img/action1.png";
import action2 from "../../assets/img/action2.png";
import action3 from "../../assets/img/action3.png";
import action4 from "../../assets/img/action4.png";
import action5 from "../../assets/img/action5.png";
import action6 from "../../assets/img/action6.png";

function customStyles(action = actioncardIcon) {
  return {
    overlay: {
      width: "100vw",
      height: "100vh",
      zIndex: "30",
    },
    content: {
      position: "fixed",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: "40",
      margin: "auto auto",
      width: "450px",
      height: "600px",
      borderRadius: "20px",
      background: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), url(${action})`,
      backgroundSize: "500px 500px",
      backgroundPosition: "center",
    },
  };
}

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
  // customstyle의 배경을 지정하기위해 필요한 action 변수
  let action = action1;

  const findKeyByValueInArray = (obj, value) => {
    for (const key in obj) {
      if (obj[key].find((target) => target === value)) {
        return key;
      }
    }
    return undefined;
  };

  switch (eventState) {
    // case "MUTE":
    //   const muteUser = [...gameData.gameUsers].find((user) => {
    //     if (user.cards.includes(1)) {
    //       return user;
    //     }
    //   });
    //   title = "침묵하라 이것아!";

    //   content = `${
    //     muteUser.memberId === Number(myId)
    //       ? "당신은 침묵을 유지해야 합니다!"
    //       : "누군가 이번 라운드에서 침묵을 유지해야 합니다!"
    //   }`;
    //   break;

    case "MUTE_OFF":
      action = action5;
      const muteOffUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      content = `${muteOffUser.nickname}
님의 침묵이 풀렸습니다!`;
      break;

    case "CHOICE_ALL_TURN":
      action = action1;
      title = "나만 믿어";
      const choiceUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      content = `${choiceUser.nickname}님 행운을 빕니다!!
이번 라운드 동안
이 카드를 가지고 있던
당신의 차례가 계속 됩니다.`;
      break;

    case "CAN_SEE_CARD":
      action = action2;
      title = "카드를 확인하세요!";
      let seeCardUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      content = `${seeCardUser.nickname}님
원하는 카드 1장을
선택하고 공개한 뒤,
다시 뒷면으로 뒤집습니다
의심스러운 카드를
확인해보세요`;
      break;

    case "SEE_CARD":
      action = action2;
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
      content = `${revealCardUser.nickname}님의 선택!
${_key} 카드를 선택했습니다!`;
      break;

    case "DELETE_CHEEZE_CARD":
      action = action4;
      // title = "뭐야 어디갔어 아으 여아정";
      content = `치즈가 사라졌어요!
테이블 가운데에 있는
치즈 한 개를 
다시 카드 더미에 되돌립니다.
      `;
      break;

    case "DELETE_USER_CARDS":
      action = action6;
      title = "집주인의 청소기";
      const cardDeleteUser = [...gameData.gameUsers].find((user) => {
        if (user.memberId === gameData.gamePlayDTO.curTurn) {
          return user;
        }
      });
      content = `로봇청소기가 지나갔어요!!
공개되지 않은
${cardDeleteUser.nickname}님의 카드를
모두 카드 더미에 넣습니다.`;
      break;

    case "SHOW_JOB":
      action = action3;
      title = "내가 뭐~게";
      const watchUserId = gameData.gameActionDTO.showJobDTO.watchMemberId;
      // 여기 오타
      const showUserId = gameData.gameActionDTO.showJobDTO.showMemeberId;
      const revealJob = gameData.gameActionDTO.showJobDTO.job;
      const myId = localStorage.getItem("id");
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

      if (myId === watchUserId) {
        content = `${userList[1].nickname}님의 직업은 ${
          revealJob === 1 ? "고양이" : "쥐"
        } 입니다!`;
      } else if (myId === showUserId) {
        content = `당신의 정체가 ${userList[0].nickname}님에게 공개됩니다!`;
      } else {
        content = `${userList[1].nickname}님의 정체가 ${userList[0].nickname}님에게 공개됩니다!`;
      }

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
      style={customStyles(action)}
      onRequestClose={() => {
        setModalState(false);
      }}
    >
      {/* title은 사용하지 않을 겁니다. */}

      {/* {eventState === "MUTE" && (
        <div>
          <div className="flex justify-center w-[200px] h-[200px]">
            <img className="w-[150px] h-[150px]" src={mute} />
          </div>
          <div className="text-[20px]">{content}</div>
        </div>
      )} */}
      {eventState === "CHOICE_ALL_TURN" && (
        <div className="flex flex-col justify-center items-center h-5/6 ">
          <p
            className="text-[30px] font-extrabold text-center"
            style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
          >
            {content}
          </p>
        </div>
      )}
      {eventState === "CAN_SEE_CARD" && (
        <div className="flex flex-col justify-center items-center h-5/6 ">
          <p
            className="text-[30px] font-extrabold text-center"
            style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
          >
            {content}
          </p>
        </div>
      )}
      {eventState === "SEE_CARD" && (
        <div className="flex flex-col justify-center items-center h-5/6 ">
          <p
            className="text-[30px] font-extrabold text-center"
            style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
          >
            {content}
          </p>
        </div>
      )}
      {eventState === "DELETE_CHEEZE_CARD" && (
        <div className="flex flex-col justify-center items-center h-5/6 ">
          <p
            className="text-[30px] font-extrabold text-center"
            style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
          >
            {content}
          </p>
        </div>
      )}
      {eventState === "DELETE_USER_CARDS" && (
        <div className="flex flex-col justify-center items-center h-5/6 ">
          <p
            className="text-[30px] font-extrabold text-center"
            style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
          >
            {content}
          </p>
        </div>
      )}
      {eventState === "SHOW_JOB" && (
        <div className="flex flex-col justify-center items-center h-5/6 ">
          <p
            className="text-[30px] font-extrabold text-center"
            style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}
          >
            {content}
          </p>
        </div>
      )}
      <GameTimer timer={timer} setTimer={setTimer} gameState={gameState} />
    </Modal>
  );
};
