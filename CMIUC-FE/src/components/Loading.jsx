import Spinner from "../assets/loading.gif";

const Loading = ({ message = "로딩중..." }) => {
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="text-center">
                <h3 className="mb-4 text-2xl text-blue-500">{message}</h3>
                <img src={Spinner} alt="Loading" className="mx-auto w-24" />
            </div>
        </div>
    )
};

export default Loading;
