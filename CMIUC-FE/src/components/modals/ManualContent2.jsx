import mouse1 from "../../assets/image/manual/mouse1.jpg";
import roundImg from "../../assets/img/roundImg.png";

const imgStyle = {
  width: "60%", // 사진 크기를 100%로 조정
  height: "auto", // 가로 비율에 맞춰 자동으로 높이 조정
};

export default function ManualContent2() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center" style={{ marginTop: "40px" }}>
          <img src={roundImg} style={imgStyle} />
        </div>
        <h2 className="mt-7 text-4xl text-center mb-10px">
          랜덤으로 고양이와 쥐 중 하나의 역할을 배정 받아요. <br />선 플레이어가 정해지면
          게임을 시작합니다!
        </h2>
      </div>
    </>
  );
}
