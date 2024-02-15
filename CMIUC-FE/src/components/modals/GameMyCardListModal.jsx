import Modal from "react-modal";
import { useContext, useEffect } from "react";
import { GameContext } from "../game/GameLogic";
import { GameMyCardListItem } from "../game/GameMyCardListItem";

export const GameMyCardListModal = ({ checkMyCards, setCheckMyCards }) => {
  const { gameData } = useContext(GameContext);
  const myId = Number(localStorage.getItem("id"));
  const myData = [...gameData.gameUsers].find((user) => user.memberId === myId);
  const myCards = [...myData.cards];

  const shuffle = (cardDeck) => {
    let shuffled = [];
    for (let i = 0; cardDeck.length > 0; i += 1) {
      const randomIndex = Math.floor(Math.random() * cardDeck.length);
      shuffled = shuffled.concat(cardDeck.splice(randomIndex, 1));
    }
    return shuffled;
  };

  const onClickHandler = () => {
    setCheckMyCards((prev) => !prev);
  };

  return (
    <>
      <button
        className="absolute bottom-[12px] left-[1070px] bg-blue-500 text-white p-2 rounded-r-lg"
        onClick={onClickHandler}
      >
        내 카드
      </button>
      <Modal
        isOpen={checkMyCards}
        shouldCloseOnOverlayClick={false}
        onRequestClose={() => setCheckMyCards(false)}
        overlayClassName="fixed inset-0 flex items-end justify-end"
        className="relative flex flex-col items-center bg-white rounded-lg max-w-xl border border-gray-300 w-[650px] h-[230px]"
      >
        <div className="flex justify-center m-2">
          <h2 className="text-2xl font-bold text-blue-600">내 카드 목록</h2>
        </div>

        <div className="flex justify-around items-center flex-wrap w-[600px] h-[120px]">
          {myCards.length > 0
            ? shuffle(myCards).map((card, index) => (
                <div key={index}>
                  <GameMyCardListItem card={card} />
                </div>
              ))
            : "카드가 없습니다."}
        </div>

        <div className="flex justify-center items-end m-2">
          <button
            className="bg-blue-500 text-white border border-gray-300 px-4 py-2 rounded-md transition duration-200 ease-in-out hover:border-gray-500 focus:outline-none"
            type="button"
            onClick={() => {
              setCheckMyCards(false);
            }}
          >
            닫기
          </button>
        </div>
      </Modal>
    </>
  );
};
