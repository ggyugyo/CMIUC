import cardBack from "../../assets/img/cardBack.png";

export const GameTableCardListItem = ({ key, card }) => {
  return (
    <>
      {/* NOTE : 카드 className text-black/0 추가하기 -> 텍스트 투명 설정 */}
      <div
        style={{
          backgroundImage: `url("${cardBack}")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="w-[80px] h-[130px] bg-cover bg-center"
      >
        {card}
      </div>
    </>
  );
};
