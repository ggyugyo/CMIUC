import { useContext, useEffect } from "react";
import { useSocket } from "../../settings/SocketContext";
import { GameContext } from "./GameLogic";
import ReactCardFlip from "react-card-flip";
import { CardImageMap } from "../../map/game/CardInfoMap";
import cardBack from "../../assets/img/cardBack.png";

export const GamePlayerCardListItem = ({ cards, memberId }) => {
  const { gameData, headers, isFlipped, setIsFlipped } =
    useContext(GameContext);
  const { client } = useSocket();

  const gameUsers = [...gameData.gameUsers].sort(
    (a, b) => a.memberId - b.memberId
  );
  const cardDeck = cards;
  const hasCardPlayer = memberId;
  const userLength = gameUsers.length;
  const myId = Number(localStorage.getItem("id"));

  // NOTE : 현재 차례인 플레이어 찾기
  const findCurTurnPlayer = gameUsers.find((user, _) => {
    if (user.memberId === gameData?.gamePlayDTO?.curTurn) {
      return user;
    }
  });

  // NOTE : 객체의 value로 key를 찾는 함수
  const findKeyByValueInArray = (obj, value) => {
    for (const key in obj) {
      if (obj[key].find((target) => target === value)) {
        return key;
      }
    }
    return null; // 값을 찾지 못한 경우
  };

  const sendCardInfo = (userId, openCardNum) => {
    client?.publish({
      destination: `/pub/games/${gameData.gamePlayDTO.gameId}/pick-card`,
      headers: headers(),
      body: JSON.stringify({ nextTurn: userId, openCardNum: openCardNum }),
    });
  };

  const onClickHandler = (e, clickedCardIndex) => {
    // NOTE : 테이블 카드가 6장이 되면 클릭이벤트 방지
    if (gameData.gamePlayDTO.tableCards.length === gameData.gameUsers.length) {
      return;
    } else if (gameData.gamePlayDTO.mousetrap === 1) {
      return;
    } else if (gameData.gamePlayDTO.cheezeCnt === gameData.gameUsers.length) {
      return;
    }
    // NOTE : 유저 정보를 담고있는 객체 복사
    let copiedPlayerInfo = gameUsers;
    // NOTE : 클릭이벤트가 발생한 카드를 가지고 있는 유저의 INDEX
    let findPlayerIndex = copiedPlayerInfo.findIndex(
      (player) => player.memberId === hasCardPlayer
    );
    // NOTE : 클릭이벤트가 발생한 카드를 가지고 있는 유저
    let copiedPlayer = copiedPlayerInfo[findPlayerIndex];
    // console.log(
    //   "클릭이벤트가 발생한 유저"
    //   copiedPlayer,
    //   "현재 차례인 유저",
    //   findSelfPlayer
    // );
    // NOTE: 만약 클릭한 사용자가 isFirstPlayer가 아니면 함수를 종료
    if (copiedPlayer.memberId === findCurTurnPlayer.memberId) {
      return;
    } else {
      // NOTE : 클릭이벤트가 발생한 유저의 카드 리스트
      let copiedCardDeck = [...cardDeck];
      // NOTE : 클릭 이벤트를 통해 선택한 카드
      const pickCard = copiedCardDeck[clickedCardIndex];
      sendCardInfo(copiedPlayer.memberId, pickCard);
    }
  };

  const cardStyleMap = () => {
    switch (cardDeck.length) {
      case 5:
        return [
          "-rotate-[30deg] hover:-translate-y-[20px]",
          "-rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",
          "-translate-y-[15px] hover:-translate-y-[40px]",
          "rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",
          "rotate-[30deg] hover:-translate-y-[20px]",
        ];
      case 4:
        return [
          "-rotate-[30deg] hover:-translate-y-[20px]",
          "-rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",
          "rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",
          "rotate-[30deg] hover:-translate-y-[20px]",
        ];

      case 3:
        return [
          "-rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",
          "-translate-y-[15px] hover:-translate-y-[40px]",
          "rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",
        ];
      case 2:
        return [
          "-rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",

          "rotate-[15deg] -translate-y-[10px] hover:-translate-y-[30px]",
        ];
      default:
        return ["-translate-y-[15px] hover:-translate-y-[40px]"];
    }
  };

  return (
    <>
      {cardDeck.map((card, index) => (
        // NOTE : 카드 className text-black/0 추가하기 -> 텍스트 투명 설정
        <div
          style={{
            backgroundImage: `url("${
              isFlipped === true
                ? CardImageMap(userLength, card)
                : cardBack
            }")`,
            backgroundPosition: "center",
          }}
          className={`w-[50px] h-[80px] bg-cover bg-center cursor-pointer -mx-[10px] brightness-[0.8] z-20 hover:brightness-100 hover:scale-[1.2] transition-all duration-300 ease-in-out ${
            cardStyleMap()[index]
          }`}
          key={index}
          onClick={
            (e) =>
              localStorage.getItem("id") === String(findCurTurnPlayer.memberId)
                ? onClickHandler(e, index)
                : null

            // onClickHandler(e, index)
          }
        >
          {card}
        </div>
      ))}
    </>
  );
};
