import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangeNicknameModal from "../modals/ChangeNickNameModal";
import myinfo from "../../assets/img/myinfo.jpg";
import axios from "axios";
import { BASE_URL, REDIRECT_URL } from "../../api/url/baseURL";
import Swal from "sweetalert2";
import DiamondIcon from "@mui/icons-material/Diamond";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MyPageMain = () => {
  const nickname = localStorage.getItem("nickname");
  const point = localStorage.getItem("point");
  const [newNickname, setNewNickname] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = `Bearer ${localStorage.getItem("accessToken")}`;
  const oauthProvider = localStorage.getItem("oauthProvider");
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [alertOpen, setAlertOpen] = useState(false);

  const headers = {
    AUTHORIZATION: token,
  };

  // 닉네임 변경 요청 함수
  //   const changeNickname = (newNickname) => {
  //     if (point >= 5000) {
  //       axios
  //         .post(`${BASE_URL}/api/members/point/nickname`, null, {
  //           params: { nickname: newNickname },
  //           headers,
  //         })
  //         .then((response) => {
  //           console.log(response);
  //           if (response.status === 200) {
  //             localStorage.setItem("nickname", newNickname);
  //             localStorage.setItem("point", point - 5000);
  //             closeModal();
  //             <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
  //               Here is a gentle confirmation that your action was successful.
  //             </Alert>;
  //             window.location.reload(); // 페이지 새로고침 코드 추가
  //           }
  //           console.log(newNickname);
  //           console.log(response);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //           if (error.response.status === 400) {
  //             alert(error.response.data);
  //           } else if (error.response.status === 500) {
  //             closeModal();
  //             alert(error.response.data);
  //           }
  //           console.log(newNickname);
  //         });
  //     } else {
  //       closeModal();
  //     }
  // };

  // 회원탈퇴 요청 함수
  function deleteMember(oauthProvider) {
    Swal.fire({
      title: "정말 탈퇴 하실건가요?",
      text: "탈퇴시 전적 및 포인트 복구가 불가합니다.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        if (oauthProvider === "KAKAO") {
          const CLIENT_ID = "c2460245966cdb846f6242c100a367dd";

          const REDIRECT_URI = `${REDIRECT_URL}/callback/unlink/kakao`;
          const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

          window.location.href = KAKAO_AUTH_URL;
        } else if (oauthProvider === "NAVER") {
          const CLIENT_ID = "COPeWLjv1__blWtJRC3_";
          const REDIRECT_URI = `${REDIRECT_URL}/callback/unlink/naver`;
          const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=kM0Zf3Lr0U&redirect_uri=${REDIRECT_URI}`;

          window.location.href = NAVER_AUTH_URL;
        }
      }
    });
  }

  const changeNickname = () => {
    Swal.fire({
      title: "변경을 원하는 닉네임을 입력해주세요",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "변경하기",
      showLoaderOnConfirm: true,
      preConfirm: async (input) => {
        try {
          const response = await axios.post(
            `${BASE_URL}/api/members/point/nickname`,
            null,
            {
              params: { nickname: input },
              headers,
            }
          );
          if (response.status === 200) {
            localStorage.setItem("nickname", input);
            localStorage.setItem("point", point - 5000);
            window.location.reload(); // 페이지 새로고침 코드 추가
          }
        } catch (error) {
          if (error.response.status === 400) {
            Swal.showValidationMessage(`
            ${error.response.data}
          `);
          } else if (error.response.status === 500) {
            Swal.showValidationMessage(`
             ${error.response.data}
          `);
          }
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `zzz`,
        });
      }
    });
  };

  const navigate = useNavigate();
  const goLobby = () => {
    navigate("/lobby");
  };

  return (
    <div className="">
      <ArrowBackIcon
        onClick={goLobby}
        className="hover:opacity-75 cursor-pointer"
        sx={{ fontSize: 100, color: "white" }}
      />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center p-8 space-y-8 bg-white bg-opacity-25 shadow-md rounded-md max-w-xl mx-auto">
          <div className="flex justify-between w-full">
            <p
              className="text-3xl bg-white   py-3 px-4 rounded-full text-blue-300 cursor-pointer"
              onClick={openModal}
            >
              {nickname}
            </p>
            <p className="text-2xl py-3 px-4 rounded-full bg-white  text-yellow-300">
              <DiamondIcon
                className="mr-1 pb-1"
                fontSize="large"
                color="yellow"
              />{" "}
              {point}
            </p>
          </div>
          <div className="flex justify-center w-full">
            <img src={myinfo} alt="My Image" className="rounded-full w-1/2" />
          </div>

          <div className="flex justify-between w-full">
            <button
              onClick={changeNickname}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              닉네임 변경
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => deleteMember(oauthProvider)}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageMain;
