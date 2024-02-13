import React from "react";
import Logo from "../../assets/img/main_bg.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ManualModal from "../modals/ManualModal";
function Header() {
  const userNickname = localStorage.getItem("nickname");
  const userPoint = localStorage.getItem("point");

  const logOut = () => {
    localStorage.clear();
    sessionStorage.clear();
    location.href = "/";
  };

  return (
    <div className="border p-4 flex justify-between items-center h-16">
      <div className="flex items-center space-x-4 ">
        <img src={Logo} width="45" height="45"></img>
        <h1 className="font-sans font-extrabold text-3xl text-yellow-300">
          Catch Mouse If You CAT!
        </h1>
        <ManualModal />
      </div>
      <div className="flex justify-end items-center text-lg">
        <p className="mr-4 ">{userNickname}</p>
        <p className="mr-5">포인트 : {userPoint}</p>
        <button className="mr-6" onClick={() => (location.href = "/mypage")}>
          <PermIdentityIcon fontSize="large" />
        </button>
        <button onClick={logOut} className="mr-2">
          <LogoutIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
}

export default Header;
