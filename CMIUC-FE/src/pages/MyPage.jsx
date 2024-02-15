import React, { useEffect, useState } from "react";
import MyPageMain from "../components/mypage/MyPageMain.jsx";
import lobby1 from "../assets/image/lobby/lobby1.jpg";
import lobby2 from "../assets/image/lobby/lobby2.jpg";
import lobby3 from "../assets/image/lobby/lobby3.jpg";
import lobby4 from "../assets/image/lobby/lobby4.jpg";
import lobby5 from "../assets/image/lobby/lobby5.jpg";
import lobby6 from "../assets/image/lobby/lobby6.jpg";
import lobby7 from "../assets/image/lobby/lobby7.jpg";
export default function Home() {
  const [bgImage, setBgImage] = useState();
  useEffect(() => {
    const images = [lobby1, lobby2, lobby3, lobby4, lobby5, lobby6, lobby7]; // 이미지 파일들의 배열
    const randomImage = images[Math.floor(Math.random() * images.length)]; // 랜덤으로 이미지 선택
    setBgImage(`url(${randomImage})`); // 배경 이미지 설정
  }, []);
  return (
    <div
      className="h-screen"
      style={{
        backgroundImage: bgImage,
      }}
    >
      <MyPageMain />
    </div>
  );
}
