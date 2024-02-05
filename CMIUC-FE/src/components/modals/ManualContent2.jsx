import mouse1 from "../../assets/image/manual/mouse1.jpg";

const imgStyle = {
  width: "30%", // 사진 크기를 100%로 조정
  height: "20%", // 가로 비율에 맞춰 자동으로 높이 조정
  marginTop: "30px",
};

export default function ManualContent2() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img src={mouse1} style={imgStyle} />
        <h2 className="mt-7 text-2xl text-center">
          쥐는 필요한 치즈를 모두 찾아야 해요. <br />
          그렇지 않으면 고양이에게 잡힐 거예요!
        </h2>
      </div>
    </>
  );
}
