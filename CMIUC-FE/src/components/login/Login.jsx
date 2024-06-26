import React from "react";
import "./Login.css"; // 스타일 파일 import
import KakaoLogin from "./KakaoLogin";
import MainBackground from "../../assets/img/mainImg.png";
import Naver from "./Naver";

function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center bg-gradient-to-r from-blue-200 via-blue-500 to-blue-500">
      <div
        className="hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen"
        style={{
          backgroundImage: `url(${MainBackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      ></div>
      <div>
        <h1 className="text-black text-9xl font-bold ml-12">
          Catch MOUSE <br />
          If <br />
          you CAT
        </h1>
      </div>
      <div
        className="w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
  flex items-center justify-center text-center"
      >
        <div className="flex-col items-center">
          <h1 className="items-center justify-items-center text-5xl leading-normal mb-12  text-yellow-300 ">
            속고 속이는
            <br /> 심리 게임 <br />
            <p className="text-2xl mt-5">'Catch Mouse If You Cat!'</p>
          </h1>
          <div className="justify-center justify-items-center"></div>
          {/* <hr className="my-6 w-full" /> */}
          <div className="flex flex-col space-y-4 w-full  lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3">
            <KakaoLogin className="w-full" />
            <Naver className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
