import catmouse from "../../assets/img/catrat1.png";

const imgStyle = {
  width: "30%", // 사진 크기를 100%로 조정
  height: "auto", // 가로 비율에 맞춰 자동으로 높이 조정
  marginTop: "30px",
};

export default function ManualContent3() {
  return (
    <>
      <div className="flex flex-col items-center">
        <img src={catmouse} style={imgStyle} />
        <h2 className="mt-7 text-3xl text-center">
          만약 치즈를 모두 찾지 못하고 <br />
          덫도 찾지 못한다면, 고양이가 이긴답니다! <br />
          그리고 즉시 게임이 종료돼요.
        </h2>
      </div>
    </>
  );
}