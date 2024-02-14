import mainImg from "../../assets/img/mainImg.png";

const imgStyle = {
  width: "30%", // 사진 크기를 100%로 조정
  height: "auto", // 가로 비율에 맞춰 자동으로 높이 조정
  marginTop: "90px",
};

export default function ManualContent7() {
  return (
    <>
      <div className="flex flex-col items-center">
          <img src={mainImg} style={imgStyle} className="w-1/2" />
          <h2 className="mt-7 text-4xl text-center">
            모든 사람에게 차례가 돌아가지 않으므로 <br />
            신중히 카드를 선택하세요.
          </h2>
      </div>
    </>
  );
}
