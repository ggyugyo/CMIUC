import cat from "../../assets/img/cat.png";

const imgStyle = {
  width: "30%", // 사진 크기를 100%로 조정
  height: "auto", // 가로 비율에 맞춰 자동으로 높이 조정
  marginTop: "30px",
};

export default function ManualContent4() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img src={cat} style={imgStyle} />
        <h2 className="mt-7 text-4xl text-center">
          고양이는 쥐덫을 찾습니다. <br />
          쥐를 잡기 위해선 장비가 필요하니까요!
        </h2>
      </div>
    </>
  );
}