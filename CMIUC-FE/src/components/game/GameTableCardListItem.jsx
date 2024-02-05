import cardBack from "../../assets/image/game/cardBack.png";

export const GameTableCardListItem = ({ key, card }) => {
  return (
    <>
      {/* NOTE : 카드 className text-black/0 추가하기 -> 텍스트 투명 설정 */}
      <div
        style={{ backgroundImage: `url("${cardBack}")` }}
        className="w-[80px] h-[130px] bg-cover bg-center"
      >
        {card}
      </div>
    </>
  );
};
