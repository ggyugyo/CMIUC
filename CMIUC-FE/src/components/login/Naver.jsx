import React from "react";
import NaverLogin from "../../assets/img/naverLogin.png";
import { BASE_URL } from "../../api/url/baseURL";

function Naver() {
  // 나중에 .env 파일에 담으면 되려나?
  const CLIENT_ID = "COPeWLjv1__blWtJRC3_";
  const REDIRECT_URI = `${BASE_URL}/callback/naver`;
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=kM0Zf3Lr0U&redirect_uri=${REDIRECT_URI}`;

  const Login = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <button
      onClick={Login}
      type="button"
      style={{
        backgroundImage: `url(${NaverLogin})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "300px", // 버튼의 너비를 지정
        height: "45px", // 버튼의 높이를 지정
      }}
      className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
    ></button>
  );
}

export default Naver;
