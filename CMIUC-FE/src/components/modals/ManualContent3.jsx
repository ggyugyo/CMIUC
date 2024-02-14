import cheeseIcon from "../../assets/img/cheeseIcon.png";
import trapIcon from "../../assets/img/trapIcon.png";
import actionIcon from "../../assets/img/actionIcon.png";

const imgStyle = {
  width: "15%", // 사진 크기를 100%로 조정
  height: "auto", // 가로 비율에 맞춰 자동으로 높이 조정
  marginTop: "30px",
};

export default function ManualContent3() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center" style={{ marginTop: "100px", marginBottom: "30px" }}>
          <img src={cheeseIcon} style={imgStyle} className="w-1/3 mr-8" /> 
          <img src={trapIcon} style={imgStyle} className="w-1/3 mr-8" /> 
          <img src={actionIcon} style={imgStyle} className="w-1/3" />
        </div>

        <h2 className="mt-7 mb-5 text-4xl text-center" style={{ marginTop: "30px"}}>
          역할군마다 찾아야 하는 카드가 달라요.
        </h2>
        <h2 className="text-3xl text-center">상대를 속여 카드를 지키거나 <br /> 자신의 감을 믿고 <br />  상대에게서 카드를 찾아내세요!</h2>
      </div>
    </>
  );
}
