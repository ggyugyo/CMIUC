import React, { useEffect, useState } from "react";
import ChangeNicknameModal from "../modals/ChangeNickNameModal";
import myinfo from "../../assets/img/myinfo.jpg";
import axios from "axios";
import { BASE_URL } from "../../api/url/baseURL";

const MyPage = () => {
  const nickname = localStorage.getItem("nickname");
  const point = localStorage.getItem("point");
  const [newNickname, setNewNickname] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const token = `Bearer ${localStorage.getItem("accessToken")}`;

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

  const changeNickname = (newNickname) => {
    if (point >= 5000) {
      axios
        .post(`${BASE_URL}/api/members/point/nickname`, null, {
          params: { nickname: newNickname },
          headers,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            localStorage.setItem("nickname", newNickname);
            localStorage.setItem("point", point - 5000);
            closeModal();
            alert("닉네임 변경 완료");
            window.location.reload(); // 페이지 새로고침 코드 추가
          }
          console.log(newNickname);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status === 400) {
            alert(error.response.data);
          } else if (error.response.status === 500) {
            closeModal();
            alert(error.response.data);
          }
          console.log(newNickname);
        });
    } else {
      closeModal();
      alert("포인트가 부족합니다.");
    }
  };

  return (
    <div className="border p-4 space-y-4 mb-5 bg-blue-50 max-w-md mx-auto">
      <div className="flex justify-between mb-3">
        <p
          className="text-lg font-bold text-blue-500 cursor-pointer"
          onClick={openModal}
        >
          {nickname}
        </p>
        <p className="text-lg font-bold text-orange-500">포인트 : {point}</p>
      </div>
      <div className="mb-3 flex justify-center">
        <img src={myinfo} alt="My Image" className="rounded-full w-1/2" />
      </div>
      <ChangeNicknameModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        newNickname={newNickname}
        setNewNickname={setNewNickname}
        changeNickname={changeNickname}
      />

      <div className="flex justify-between">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          닉네임 변경
        </button>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          회원탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
