export const GameBoard = ({ cardType, timer }) => {
  return (
    <div className="absolute flex justify-between w-[1900px] h-[100px] top-[0px] border-4 border-black">
      <div className="flex flex-col items-center w-[350px]">
        <div className="flex justify-center items-center w-[350px] h-[40px] border-4 border-black">
          타이머
        </div>
        <div className="flex justify-center items-center w-[350px] h-[60px] border-4 border-black">
          {timer}
        </div>
      </div>
      <div className="flex flex-col items-center w-[1200px]">
        <div className="flex justify-center items-center w-[1200px] h-[40px] border-4 border-black">
          게임 상황판
        </div>
        <div className="flex justify-evenly w-[1200px] h-[60px]">
          <div className="flex justify-center items-center w-[400px] border-4 border-black">
            치즈 : {cardType.CHEESE}
          </div>
          <div className="flex justify-center items-center w-[400px] border-4 border-black">
            쥐덫 : {cardType.TRAP}
          </div>
          <div className="flex justify-center items-center w-[400px] border-4 border-black">
            꽝 : {cardType.EMPTY}
          </div>
          <div className="flex justify-center items-center w-[400px] border-4 border-black">
            액션 : {cardType.ACTION}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-[350px]">
        <div className="flex justify-center items-center w-[350px] h-[40px] border-4 border-black">
          설정
        </div>
        <div className="flex justify-center items-center w-[350px] h-[60px] border-4 border-black">
          설정 버튼
        </div>
      </div>
    </div>
  );
};
