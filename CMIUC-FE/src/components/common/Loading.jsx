import Spinner from "../../assets/loading.gif";
const Loading = () => {
    return(
        <div>
            <h3>로딩중...</h3>
            <img src={Spinner} alt="Loading" width="10%" />
        </div>
    )
};


export default Loading;