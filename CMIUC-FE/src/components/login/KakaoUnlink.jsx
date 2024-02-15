import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/url/baseURL";
import Swal from "sweetalert2";
const KakaoUnlink = () => {
  console.log("KaKaoUnlinkPage");
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
    console.log("카카오 탈퇴 요청");
    try {
      // 카카오로부터 받아온 code를 BE에 전달하면 BE에서 카카오에 요청하여 회원탈퇴
      const response = await axios.delete(`${BASE_URL}/api/auth/kakao`, {
        data: {
          authorizationCode: code,
        },
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (response.data.status === 200) {
        console.log("카카오 탈퇴 성공");
        localStorage.clear();
        Swal.fire({
          position: "middle",
          icon: "success",
          title: `회원탈퇴가 완료되었습니다.
          그동안 이용해주셔서 감사합니다.`,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      }
      console.log(response);
    } catch (error) {
      if (error.response.status === 500) {
        Swal.fire({
          icon: "error",
          title: "탈퇴 요청 실패",
          text: "탈퇴 요청에 실패했습니다. 다시 시도해주세요.",
        });
      }
      navigate("/");
    }
  };

  return <div className=""></div>;
};

export default KakaoUnlink;
