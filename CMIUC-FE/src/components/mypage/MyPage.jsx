import React, { useEffect, useState } from "react";
import ChangeNicknameModal from "../modals/ChangeNickNameModal";
import myinfo from "../../assets/img/myinfo.jpg";
import Alert from "@mui/material/Alert";

const MyPage = () => {
  const nickname = localStorage.getItem("nickname");
  const point = localStorage.getItem("point");
  const [newNickname, setNewNickname] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const changeNickname = () => {
    if (point > 150) {
      closeModal();
    } else {
      setAlertOpen(true);
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
      {alertOpen && modalIsOpen && (
        <Alert severity="error">포인트가 부족합니다</Alert>
      )}
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
