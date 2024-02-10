import React from "react";
import Logo from "../../assets/img/main_bg.png";
import ManualModal from "../modals/ManualModal";

function Header() {
  const logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    location.href = "/";
  };

  return (
    <div className="border p-4 flex justify-between items-center h-16">
      <div className="flex items-center space-x-4 ">
        <img src={Logo} width="45" height="45"></img>
        <h1>Catch Mouse If You CAT!</h1>
        <ManualModal />
      </div>
      <div className="flex justify-end items-center space-x-4">
        <button onClick={logOut} className="ml-4">
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default Header;
