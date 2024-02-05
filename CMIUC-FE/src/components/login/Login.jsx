import React from "react";
import "./Login.css"; // 스타일 파일 import
import KakaoLogin from "./KakaoLogin";
import MainBackground from "../../assets/img/main_bg.png";
import Naver from "./Naver";

function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-neutral-300 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src={MainBackground}
          alt=""
          className=" w-full h-full object-contain"
        />
      </div>

      <div
        className="bg-neutral-300 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
            flex items-center justify-center"
      >
        <div className="w-full h-100 ">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            SNS 계정으로 로그인
          </h1>

          {/* <form className="mt-6" action="#" method="POST">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="Enter Email Address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                autoComplete
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name=""
                id=""
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                    focus:bg-white focus:outline-none"
                required
              />
            </div>

            <div className="text-right mt-2">
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
              <a
                href="#"
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                  px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form> */}

          <hr className="my-6 border-gray-300 w-full" />

          <div className="flex flex-col items-center justify-center space-y-4 w-full md:max-w-md lg:max-w-full md:mx-auto md:mx-0 md:w-1/2 xl:w-1/3">
            <KakaoLogin className="w-full" />
            <Naver className="w-full" />
          </div>

          <p className="mt-8">
            계정이 없으세요?{" "}
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              회원 가입
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
