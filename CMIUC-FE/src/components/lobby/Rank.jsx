import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../api/url/baseURL";
import axios from "axios";
const Rank = () => {
  const nickname = localStorage.getItem("nickname");
  const point = localStorage.getItem("point");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [topTenRank, setTopTenRank] = useState([]);
  const [catPlayRank, setCatPlayRank] = useState([]);
  const [mousePlayRank, setMousePlayRank] = useState([]);
  const [myRank, setMyRank] = useState([]);
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const token = "Bearer " + localStorage.getItem("accessToken");
  const rankViews = ["total", "cat", "mouse", "my"];
  const rankNames = ["전체 순위", "고양이 순위", "쥐 순위", "내 순위"];

  const showNextRank = () => {
    setCurrentViewIndex((currentViewIndex + 1) % rankViews.length);
  };

  const showPrevRank = () => {
    setCurrentViewIndex(
      (currentViewIndex - 1 + rankViews.length) % rankViews.length
    );
  };

  const getTopTenRank = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/total-rank`, {
        headers: {
          AUTHORIZATION: token,
        },
      });
      console.log(response);
      setTopTenRank(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCatPlayRank = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/cat-rank`, {
        headers: {
          AUTHORIZATION: token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getMousePlayRank = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/cat-rank`, {
        headers: {
          AUTHORIZATION: token,
        },
      });
      setMousePlayRank(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopTenRank();
    getCatPlayRank();
    getMousePlayRank();
  }, []);

  return (
    <div
      className=" border p-4 space-t-4 mb-5"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
      }}
    >
      <div className="flex justify-items-center justify-between font-sans font-extrabold text-2xl text-blue-700">
        <span>{rankNames[currentViewIndex]}</span>
        <div>
          <button onClick={showPrevRank}>◀</button>
          <button onClick={showNextRank}>▶</button>
        </div>
      </div>
      <div>
        {currentViewIndex === 0 &&
          topTenRank.map((member, index) => (
            <p key={index}>
              {member.rank}위 {member.nickname} 승률 : {member.totalWinRate}
            </p>
          ))}
        {/* {currentViewIndex === 1 &&
          catPlayRank.map((rank, index) => <p key={index}>{rank}</p>)}
        {currentViewIndex === 2 &&
          mousePlayRank.map((rank, index) => <p key={index}>{rank}</p>)}
        {currentViewIndex === 3 &&
          myRank.map((rank, index) => <p key={index}>{rank}</p>)} */}
      </div>
    </div>
  );
};

export default Rank;
