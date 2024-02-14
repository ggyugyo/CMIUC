// import cat2 from "../../assets/image/manual/cat2.jpg";
import cat from "../../assets/img/ballcat.png";
import mouse from "../../assets/img/ballrat.png";

const imgStyle = {
  width: "30%", // 사진 크기를 100%로 조정
  height: "auto", // 가로 비율에 맞춰 자동으로 높이 조정
};

export default function ManualContent1() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex justify-center" style={{ marginTop: "70px" }}>
          <img src={mouse} style={imgStyle} className="w-1/2 mr-30px" />
          <img src={cat} style={imgStyle} className="w-1/2" />
        </div>

        <h2 className="mt-7 text-4xl text-center mt-40px text-red-700">
          Catch Mouse If You Cat <br />
        </h2>
        <h2 className="mt-7 text-4xl text-center mt-40px">
          속고 속이는 심리 게임에 참여하세요!
        </h2>
      </div>
    </>
  );
}
