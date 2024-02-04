import { useContext } from "react";
import { GameContext } from "./GameLogic";

export const GameHistory = () => {
  const { round, roundCard } = useContext(GameContext);
  console.log(roundCard);
  return (
    <div className="absolute bottom-[0px] right-[0px] flex flex-col justify-around items-center w-[650px] h-[250px] border-4 border-black">
      {round > 1 && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">1라운드</div>
          <div className="flex justify-evenly w-[650px] h-[50px]">
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              치즈 : {roundCard[0]["CHEESE"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              쥐덫 : {roundCard[0]["TRAP"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              꽝 : {roundCard[0]["EMPTY"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              액션 : {roundCard[0]["ACTION"].length}
            </div>
          </div>
        </div>
      )}
      {round > 2 && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">2라운드</div>
          <div className="flex justify-evenly w-[650px] h-[50px]">
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              치즈 : {roundCard[1]["CHEESE"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              쥐덫 : {roundCard[1]["TRAP"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              꽝 : {roundCard[1]["EMPTY"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              액션 : {roundCard[1]["ACTION"].length}
            </div>
          </div>
        </div>
      )}
      {round > 3 && (
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center">3라운드</div>
          <div className="flex justify-evenly w-[650px] h-[50px]">
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              치즈 : {roundCard[2]["CHEESE"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              쥐덫 : {roundCard[2]["TRAP"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              꽝 : {roundCard[2]["EMPTY"].length}
            </div>
            <div className="flex justify-center items-center w-[100px] border-4 border-black">
              액션 : {roundCard[2]["ACTION"].length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
