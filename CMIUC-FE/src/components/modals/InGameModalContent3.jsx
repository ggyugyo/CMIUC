import actionCard5 from "../../assets/img/action5.png";
import actionCard6 from "../../assets/img/action6.png";

export default function InGameModalContent3() {
  return (
    <div>
      <div className="flex">
        <div style={{ flex: "1", marginRight: "20px" }} className="flex">
          <img
            src={actionCard5}
            style={{ width: "170px", height: "auto", marginRight: "15px" }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl ml-2 mt-2 text-amber-800 font-bold">
              쉿... 쉿!
            </h1>
            <h2 className="ml-3 mt-1 p-2 text-xl">
              지금부터 <br />
              누군가 이 카드를 <br />
              뽑아주기 전까지 <br />
              당신은 아무 소통도 <br />할 수 없습니다! <br />
              메롱 ~
            </h2>
          </div>
        </div>
        <div style={{ flex: "1", marginLeft: "20px" }} className="flex">
          <img
            src={actionCard6}
            style={{ width: "170px", height: "auto", marginRight: "15px" }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl ml-2 mt-2 text-amber-800 font-bold">
              집주인의 청소기
            </h1>
            <h2 className="ml-3 mt-1 p-2 text-xl">
              로봇청소기가 지나갔어요!<br /> 공개되지 않은<br /> 자신의 카드가 모두
              카드 더미로 <br />들어갑니다.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
