import cardBack from "../../assets/image/game/cardBack.png";
import { useContext } from "react";
import { GameContext } from "./GameLogic";

export const GamePlayerCardItem = ({ userCard, userID }) => {
  const { playerInfo, setPlayerInfo, tableCard, setTableCard } =
    useContext(GameContext);
  const cardDeck = userCard;
  const hasCardPlayer = userID;

  const onClickHandler = (e, clickedcardIndex) => {
    // NOTE : 유저 정보를 담고있는 객체 복사
    let copiedPlayerInfo = [...playerInfo];
    // NOTE : 클릭이벤트가 발생한 카드를 가지고 있는 유저의 INDEX
    let findPlayerIndex = copiedPlayerInfo.findIndex(
      (player) => player.userID === hasCardPlayer
    );
    // NOTE : 클릭이벤트가 발생한 카드를 가지고 있는 유저
    let copiedPlayer = copiedPlayerInfo[findPlayerIndex];
    // NOTE : 클릭이벤트가 발생한 유저의 카드 리스트
    let copiedCardDeck = [...cardDeck];
    // NOTE : 클릭 이벤트를 통해 선택한 카드
    const drawCard = copiedCardDeck[clickedcardIndex];
    // NOTE : 클릭 이벤트를 통해 선택한 카드를 유저의 카드 리스트에서 제거
    copiedCardDeck.splice(clickedcardIndex, 1);
    // NOTE : 유저의 카드 리스트를 업데이트
    copiedPlayer.userCard = copiedCardDeck;
    // NOTE : 유저 정보를 업데이트
    copiedPlayerInfo[findPlayerIndex] = copiedPlayer;
    // NOTE : 전체 유저 정보를 업데이트
    setPlayerInfo(copiedPlayerInfo);
    // TEST CODE
    // console.log(copiedPlayerInfo);
    // NOTE : 테이블 카드 배열을 복사
    let newTableCard = [...tableCard];
    // NOTE : 테이블 카드 배열에 클릭 이벤트를 통해 선택한 카드를 추가
    newTableCard = newTableCard.concat(drawCard);
    // 새로운 테이블 카드 배열을 업데이트
    setTableCard(newTableCard);
    // TEST CODE
    // console.log(newTableCard);
  };
  return (
    <>
      {cardDeck.map((card, index) => (
        // NOTE : 카드 className text-black/0 추가하기 -> 텍스트 투명 설정
        <div
          style={{ backgroundImage: `url("${cardBack}")` }}
          className="w-[50px] h-[80px] bg-cover bg-center cursor-pointer"
          key={index}
          onClick={(e) => onClickHandler(e, index)}
        >
          {card}
        </div>
      ))}
    </>
  );
};
