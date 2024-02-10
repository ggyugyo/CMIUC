import React, { useEffect, useState } from "react";

const Rank = () => {
  const nickname = localStorage.getItem("nickname");
  const point = localStorage.getItem("point");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [topTenRank, setTopTenRank] = useState([]);

  useEffect(() => {}, []);

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

  return (
    <div className=" border p-4 space-y-4 mb-5 bg-blue-50">
      <div className="flex justify-between mb-3">
        <p>포인트 : {point}</p>
      </div>
      <div className="mb-3">
        <img src={myinfo} alt="My Image" style={imageStyle} />
      </div>
    </div>
  );
};

export default Rank;
