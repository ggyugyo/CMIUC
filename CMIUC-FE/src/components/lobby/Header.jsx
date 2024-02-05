import React, { useEffect, useState } from "react";
import ChangeNicknameModal from "../modals/ChangeNickNameModal";
import Logo from "../../assets/img/main_bg.png";

// 이후에 소켓 연결해서 지속적으로 방 목록을 받아오도록 해야겠지?
function Header() {
  const [myInfo, loadMyInfo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newNickname, setNewNickname] = useState("");
  const nickname = localStorage.getItem("nickname");
  const point = localStorage.getItem("point");

  const logOut = () => {
    localStorage.clear();
    location.href = "/";
    // axios.get('로그아웃?? 백 주소', {

    // }).then(response => {
    //     if (Object.prototype.toString.call(response.data) === "[object Array]") {
    //         console.log(response.data)
    //         // 받아온 데이터를 rooms 담아준다.
    //         setRooms(response.data);
    //     }
    // });
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
    <div className="border p-4 flex justify-between items-center h-16">
      <div className="flex items-center space-x-4 ">
        <img src={Logo} width="45" height="45"></img>
        <h1>Catch Mouse If You CAT!</h1>
      </div>
      <div className="flex justify-end items-center space-x-4">
        <div className="flex items-center space-x-4">
          <h2 onClick={openModal}>{nickname}</h2>
          <p>포인트 : {point}</p>
        </div>
        <button onClick={logOut} className="ml-4">
          로그아웃
        </button>
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
}

export default Header;
