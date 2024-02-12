import React, { useEffect, useState } from "react";
import FriendList from "../components/lobby/FriendList";
import Header from "../components/lobby/Header";
import MyInfo from "../components/lobby/MyInfo";
import Rooms from "../components/lobby/Rooms";
import Rank from "../components/lobby/Rank";
import lobby1 from "../assets/image/lobby/lobby1.jpg";
import lobby2 from "../assets/image/lobby/lobby2.jpg";
import lobby3 from "../assets/image/lobby/lobby3.jpg";
import lobby4 from "../assets/image/lobby/lobby4.jpg";
import lobby5 from "../assets/image/lobby/lobby5.jpg";
import lobby6 from "../assets/image/lobby/lobby6.jpg";
export default function Lobby() {
  const [bgImage, setBgImage] = useState();

  useEffect(() => {
    const images = [lobby1, lobby2, lobby3, lobby4, lobby5, lobby6]; // 이미지 파일들의 배열
    const randomImage = images[Math.floor(Math.random() * images.length)]; // 랜덤으로 이미지 선택
    setBgImage(`url(${randomImage})`); // 배경 이미지 설정
  }, []);

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundImage: bgImage }}
    >
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/4 p-3 ">
          <FriendList />
          <div className="mt-4">
            <Rank />
          </div>
        </div>
        <div className="w-3/4 p-3">
          <Rooms />
        </div>
      </div>
    </div>
  );
}
