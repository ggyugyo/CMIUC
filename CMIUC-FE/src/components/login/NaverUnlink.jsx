import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/url/baseURL";

const NaverUnlink = () => {
  console.log("KaKaoUnlinkPage");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code"); // 카카오는 Redirect 시키면서 code를 쿼리 스트링으로 준다.
    if (code) {
      // 카카오에서 제공한 코드를 가지고 백엔드에게 요청
      handleOAuthNaver(code);
    }
  }, [location]);

  const handleOAuthNaver = async (code) => {
    console.log("네이버 탈퇴 요청");
    try {
      // 카카오로부터 받아온 code를 BE에 전달하면 BE에서 카카오에 요청하여 회원탈퇴
      const response = await axios.delete(`${BASE_URL}/api/auth/naver`, {
        data: {
          authorizationCode: code,
        },
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log(response);
      if (response.data.status === 200) {
        console.log("네이버 탈퇴 성공");
        localStorage.clear();
        alert("회원탈퇴를 성공적으로 완료하였습니다.");
        navigate("/");
      }
    } catch (error) {
      if (error.response.status === 500) {
        console.log("네이버 탈퇴 실패");
        navigate("/");
      }
    }
  };

  return <div className=""></div>;
};

export default NaverUnlink;
