import React from "react";
import "./Login.css"; // 스타일 파일 import
import KakaoLogin from "./KakaoLogin";
import MainBackground from "../../assets/img/main_bg.png";
import Naver from "./Naver";

function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-blue-200 bg-opacity-50 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src={MainBackground}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      <div
        className="bg-blue-200 bg-opacity-50 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center"
      >
        <div className="w-full h-100 ">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            SNS 계정으로 로그인
          </h1>
          <div>
            배포 확인 용 : 2/12 7:10
          </div>

          <hr className="my-6 border-gray-300 w-full" />

          <div className="flex flex-col items-center justify-center space-y-4 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3">
            <KakaoLogin className="w-full" />
            <Naver className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
