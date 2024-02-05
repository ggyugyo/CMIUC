export const GameReadyButton = ({ readyOn, setReadyOn }) => {
  const onClickHandler = () => {
    setReadyOn((prev) => !prev);
  };

  return (
    <div className="absolute top-[400px] flex justify-evenly items-center w-[600px] h-[200px] border-4 border-black">
      {readyOn === false ? (
        <button
          onClick={onClickHandler}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded"
        >
          준비하기
        </button>
      ) : (
        <button
          onClick={onClickHandler}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded"
        >
          준비완료
        </button>
      )}
    </div>
  );
};
