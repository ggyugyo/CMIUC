import InGameModal from "./InGameModal";
import actionCard3 from "../../assets/img/action3.png";
import actionCard4 from "../../assets/img/action4.png";

export default function InGameModalContent2() {
  return (
    <div>
      <div className="flex">
        <div style={{ flex: "1", marginRight: "20px" }} className="flex">
          <img
            src={actionCard3}
            style={{ width: "170px", height: "auto", marginRight: "15px" }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl ml-2 mt-2 text-amber-800 font-bold">
              내가 누구~게
            </h1>
            <h2 className="ml-3 mt-1 p-2 text-xl">
              "헉 들켰다!" <br />이 카드를 뽑은 <br />
              플레이어에게만 <br />
              내 정체가 공개돼요. <br /> 과연 그는 <br />
              누구의 편일까요?
            </h2>
          </div>
        </div>
        <div style={{ flex: "1", marginLeft: "20px" }} className="flex">
          <img
            src={actionCard4}
            style={{ width: "170px", height: "auto", marginRight: "15px" }}
          />
          <div className="flex flex-col">
            <h1 className="text-3xl ml-2 mt-2 text-amber-800 font-bold">
              빽 투 더 더미
            </h1>
            <h2 className="ml-3 mt-1 p-2 text-xl">
              쥐라면 "유유", <br /> 고양이라면 "촤핫!" <br />
              이번 라운드에 찾은 <br />
              치즈 한 장을 <br />
              다시 카드 더미에 <br />되돌립니다.
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
