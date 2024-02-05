import Spinner from "../assets/loading.gif";

const Loading = ({ message = "로딩중..." }) => {
  return (
    <div className="flex flex-col justify-center items-center w-[1400px] h-[900px]">
      <div className="w-[300px] h-[200px] text-center">
        <div className="mb-4 text-2xl text-blue-500">{message}</div>
        <img src={Spinner} alt="Loading" className="mx-auto w-24" />
      </div>
    </div>
  );
};

export default Loading;
