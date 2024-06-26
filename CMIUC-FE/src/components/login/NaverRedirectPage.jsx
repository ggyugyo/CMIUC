import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../etc/Loading";
import { BASE_URL } from "../../api/url/baseURL";

const NaverRedirectPage = () => {
  console.log("네이버 리다이렉트 페이지");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // 네이버에서 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      // 네이버에서 제공한 코드를 가지고 백엔드에게 요청
      handleOAuthNaver(code);
    }
  }, [location]);

  // 네이버에서 받아온 code를 서버에 전달하여 회원가입 또는 로그인한다
  const handleOAuthNaver = async (code) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/naver`, {
        authorizationCode: code,
      });
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      const token = `Bearer ${localStorage.getItem("accessToken")};`;
      // 토큰을 BE 에 전달하여 회원가입 OR 로그인하여 데이터를 받아온다.
      const myData = await axios.get(`${BASE_URL}/api/members/login-info`, {
        headers: {
          AUTHORIZATION: token,
        },
      });
      const nickname = myData.data.nickname;
      const point = myData.data.point;
      const id = myData.data.id;
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("point", point);
      localStorage.setItem("id", id);
      localStorage.setItem("oauthProvider", myData.data.oauthProvider);

      const isFirstLogin = await axios.get(`${BASE_URL}/api/members/init`, {
        headers: {
          Authorization: token,
        },
      });
      // status 200 = 기존 유저임
      if (isFirstLogin.status === 200) {
        navigate("/lobby");
      }
    } catch (error) {
      // status 404 = 닉네임을 변경한 적이 없다 = 회원가입 필요
      if (
        (error.response.status == 404) &
        (error.response.data == "닉네임을 변경한 적이 없습니다.")
      ) {
        navigate("/register");
      } else {
        alert("로그인 실패: ");
        navigate("/");
      }
    }
  };

  return (
    <div>
      <Loading message="로그인 중 입니다..." />
    </div>
  );
};

export default NaverRedirectPage;
