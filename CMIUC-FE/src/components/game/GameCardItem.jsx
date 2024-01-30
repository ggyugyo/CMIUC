import cardBack from "../../assets/image/game/cardBack.png";

export const GameCardItem = ({ card }) => {
  return (
    <div
      style={{ backgroundImage: `url("${cardBack}")` }}
      className="w-[200px] h-[320px] bg-cover bg-center"
      value={card}
    ></div>
  );
  // return <img src={cardBack} alt={`card-${card}`} value={card} />;d
};
