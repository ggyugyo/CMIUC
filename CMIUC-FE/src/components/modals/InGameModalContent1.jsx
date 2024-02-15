import actionCard1 from "../../assets/img/action1.png";
import actionCard2 from "../../assets/img/action2.png";

export default function InGameModalContent1() {
  return (
    <div>
      <div className="flex">
        <div style={{ flex: "1", marginRight: "20px" }} className="flex">
          <img
            src={actionCard1}
            style={{ width: "30%", height: "80%", marginRight: "15px",marginTop: "10px" }}
          />
          <div className="flex flex-col">
            <h1 className="text-xl ml-2 mt-2 text-amber-800 font-bold">
              나만 믿어
            </h1>
            <h2 className="ml-3 mt-1 p-2 text-md">
              "헤이, 나만 믿어" <br /> 이번 라운드 동안 <br />이 카드를 가졌던{" "}
              <br />
              당신의 차례가 계속 됩니다. <br /> 행운을 빕니다!{" "}
            </h2>
          </div>
        </div>
        <div style={{ flex: "1", marginLeft: "20px" }} className="flex">
          <img
            src={actionCard2}
            style={{ width: "30%", height: "80%", marginRight: "15px", marginTop: "10px"}}
          />

          <div className="flex flex-col">
            <h1 className="text-xl ml-2 mt-2 text-amber-800 font-bold">
              내 이름은 코난
            </h1>
            <h2 className="ml-3 mt-1 p-2 text-md">
              "진실은 언제나 하나" <br />
              카드 선택 전에 <br /> 원하는 카드를 1장
              <br />
              미리 공개합니다.
              <br /> 의심스러운 카드를 <br />
              확인해보세요.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
