import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/url/baseURL.js";
import Loading from "../etc/Loading";

const KakaoRedirectPage = () => {
  console.log("카카오 리다이렉트 페이지");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      // 카카오에서 제공한 코드를 가지고 백엔드에게 요청
      handleOAuthKakao(code);
    }
  }, [location]);

  const handleOAuthKakao = async (code) => {
    try {
      // 카카오로부터 받아온 code를 서버에 전달하여 카카오로 회원가입 & 로그인한다
      const response = await axios.post(`${BASE_URL}/api/auth/kakao`, {
        authorizationCode: code,
      });
      // console.log("카카오 code => BE", response);
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      const myData = await axios.get(`${BASE_URL}/api/members/login-info`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // console.log("BE => FE 내정보 요청", myData);

      const nickname = myData.data.nickname;
      const point = myData.data.point;
      const id = myData.data.id;
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("point", point);
      localStorage.setItem("id", id);

      console.log("로그인 성공");
      navigate("/lobby");
    } catch (error) {
      console.log(error);
      alert("로그인 실패: ");
      navigate("/");
    }
  };

  return (
    <div>
      <Loading message="로그인 중 입니다..." />
    </div>
  );
};

export default KakaoRedirectPage;