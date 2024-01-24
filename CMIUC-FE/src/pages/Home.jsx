import Loading from "../components/Loading";
import KakaoLogin from "../components/login/KakaoLogin";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();

  const onClickHandler = () => {
    nav("/game");
  };
  return (
    <div>
      <h1>구구절절교회교회성당성당... 화이팅!</h1>
      <Loading />
      <KakaoLogin />
      <button onClick={onClickHandler}>게임페이지 개발중...</button>
    </div>
  );
}
