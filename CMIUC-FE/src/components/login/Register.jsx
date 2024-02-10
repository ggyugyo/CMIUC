import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import background from "../../assets/img/background.jpg";
import { BASE_URL } from "../../api/url/baseURL";

const Register = () => {
  const navigate = useNavigate();
  const token = `Bearer ${localStorage.getItem("accessToken")}`;
  const [nickname, setNickname] = useState("");
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const chageNickname = () => {
    axios
      .post(`${BASE_URL}/api/members/nickname?nickname=${nickname}`, null, {
        headers: {
          AUTHORIZATION: token,
        },
      })
      .then((response) => {
        console.log("닉네임 변경 요청 완료:", response);
        if (response.status === 200) {
          console.log('"닉네임 변경 완료"');
          localStorage.setItem(
            "totalCatCount",
            response.data.memberRecord.totalCatCount
          );
          localStorage.setItem(
            "totalMouseCount",
            response.data.memberRecord.totalMouseCount
          );
          localStorage.setItem(
            "totalWinRate",
            response.data.memberRecord.totalWinRate
          );
          localStorage.setItem(
            "winCatCount",
            response.data.memberRecord.winCatCount
          );
          localStorage.setItem(
            "winMouseCount",
            response.data.memberRecord.winMouseCount
          );
          localStorage.setItem(
            "winCatRate",
            response.data.memberRecord.winCatRate
          );
          localStorage.setItem(
            "winMouseRate",
            response.data.memberRecord.winMouseRate
          );
          localStorage.setItem("nickname", response.data.nickname);
          navigate("/lobby");
        }
      })
      .catch((error) => {
        if (
          error.response.status == 400 &&
          error.response.data == "중복된 닉네임입니다."
        ) {
          console.log("닉네임 변경 실패");
          alert("중복된 닉네임 입니다. 다시 입력해 주세요");
        } else {
          console.error("닉네임 변경 요청 실패:", error);
          alert("서버에 문제가 생겼습니다 다시 시도해 주세요");
        }
      });
  };
  return (
    <div
      className="relative h-screen w-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-gray-100 opacity-50"></div>
      <h1 className="relative z-10 text-5xl font-bold mb-4 text-indigo-600">
        회원가입을 축하드립니다
      </h1>
      <h2 className="relative z-10 text-2xl mb-2 text-indigo-500">
        게임에서 사용할 닉네임을 입력해 주세요
      </h2>
      <input
        type="text"
        value={nickname}
        onChange={handleNicknameChange}
        placeholder="닉네임"
        className="relative z-10 mb-4 px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-1/6"
      />
      <button
        onClick={chageNickname}
        className="relative z-10 px-8 py-3 text-lg bg-indigo-600 text-white rounded-md hover:bg-indigo-500 w-1/8"
      >
        시작하기
      </button>
    </div>
  );
};
export default Register;
