import React, { useEffect, useState } from "react";
import ChangeNicknameModal from "../modals/ChangeNickNameModal";
import myinfo from "../../assets/img/myinfo.jpg";

const MyInfo = () => {
  const nickname = localStorage.getItem("nickname");
  const point = localStorage.getItem("point");
  const [newNickname, setNewNickname] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const imageStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: "50%", // 이미지를 동그랗게
    width: "50%",
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const changeNickname = () => {
    if (point > 150) {
      // 닉네임 변경 로직
      //axios 요청 때리고
      // 정보 다시받아서 렌더링 해야할듯?
      // localStorage.setItem('nickname', newNickname);
      closeModal();
    } else {
      alert("포인트가 부족합니다.");
    }
  };

  return (
    <div className=" border p-4 space-y-4 mb-5 bg-blue-50">
      <div className="flex justify-between mb-3">
        <p className=" " onClick={openModal}>
          {nickname}
        </p>
        <p>포인트 : {point}</p>
      </div>
      <div className="mb-3">
        <img src={myinfo} alt="My Image" style={imageStyle} />
      </div>
      <ChangeNicknameModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        newNickname={newNickname}
        setNewNickname={setNewNickname}
        changeNickname={changeNickname}
      />
    </div>
  );
};

export default MyInfo;
