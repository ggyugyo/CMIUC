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
  const [myRank, setMyRank] = useState();
  const [currentViewIndex, setCurrentViewIndex] = useState(0);
  const token = "Bearer " + localStorage.getItem("accessToken");
  const rankViews = ["total", "cat", "mouse", "my"];
  const rankNames = ["종합 Top10", "고양이 Top10", "쥐 Top10", "내 정보"];

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
      console.log(response.data);
      setCatPlayRank(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getMousePlayRank = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/mouse-rank`, {
        headers: {
          AUTHORIZATION: token,
        },
      });
      setMousePlayRank(response.data);
      console.log(response.data);
      console.log(mousePlayRank);
    } catch (error) {
      console.log(error);
    }
  };
  const getMyRank = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/members/my-rank`, {
        headers: {
          AUTHORIZATION: token,
        },
      });
      setMyRank(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTopTenRank();
    getCatPlayRank();
    getMousePlayRank();
    getMyRank();
  }, []);

  return (
    <div
      className=" border p-3"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
      }}
    >
      <div className="font-sans font-extrabold text-3xl text-blue-700 mb-2 flex justify-between justify-items-center ">
        <span>{rankNames[currentViewIndex]}</span>
        <div>
          <button onClick={showPrevRank}>◀</button>
          <button onClick={showNextRank}>▶</button>
        </div>
      </div>

      <style>
        {`
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #a5b4fc;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #818cf8;
    }
    `}
      </style>
      <div
        className="p-4 shadow-md rounded-lg text-blue-700"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))",
        }}
      >
        {currentViewIndex !== 3 && (
          <div className="flex justify-between text-xl font-extrabold px-2 mb-1 ">
            <span>순위</span>
            <span>닉네임</span>
            <span>승률(%)</span>
          </div>
        )}
        {currentViewIndex === 3 && (
          <div className="flex justify-between text-xl font-extrabold mb-2 ">
            <span className="ml-3">순위</span>
            <span>전적</span>
            <span>승률(%)</span>
          </div>
        )}
        <div className="overflow-auto h-64">
          {currentViewIndex === 0 &&
            topTenRank.map((member, index) => (
              <div
                key={index}
                className="flex justify-between p-4 border-b text-lg font-extrabold  border-blue-400"
              >
                <span>{member.rank}위</span>
                <span>{member.nickname}</span>
                <span>{(member.totalWinRate * 100).toFixed(2)}</span>
              </div>
            ))}
          {currentViewIndex === 1 &&
            catPlayRank.map((member, index) => (
              <div
                key={index}
                className="flex justify-between p-4 my-1 border-b text-lg font-bold border-blue-400"
              >
                <span>{member.rank}위</span>
                <span>{member.nickname}</span>
                <span>{(member.winCatRate * 100).toFixed(2)}</span>
              </div>
            ))}
          {currentViewIndex === 2 &&
            mousePlayRank.map((member, index) => (
              <div
                key={index}
                className="flex justify-between p-4 my-1 border-b text-lg font-bold border-blue-400"
              >
                <span>{member.rank}위</span>
                <span>{member.nickname}</span>
                <span>{(member.winMouseRate * 100).toFixed(2)}</span>
              </div>
            ))}
          {currentViewIndex === 3 && (
            <div className=" font-sans rounded-lg shadow-md">
              <div className="flex justify-between text-lg font-bold border-b border-blue-400 py-6">
                <p>전체 {myRank.totalRank}위</p>
                <p>
                  {myRank.totalPlayCount}전 {myRank.totalWinCount}승{" "}
                  {myRank.totalPlayCount - myRank.totalWinCount}패
                </p>
                <p>{(myRank.totalWinRate * 100).toFixed(2)} </p>
              </div>
              <div className="flex justify-between mb-2 text-lg font-bold border-b border-blue-400 py-6">
                <p>고양이 {myRank.catRank}위</p>
                <p>
                  {myRank.totalCatCount}전 {myRank.winCatCount}승{" "}
                  {myRank.loseCatCount}패
                </p>
                <p>{(myRank.winCatRate * 100).toFixed(2)} </p>
              </div>
              <div className="flex justify-between text-lg font-bold border-b border-blue-400 py-6">
                <p>쥐 {myRank.mouseRank}위</p>
                <p>
                  {myRank.totalMouseCount}전 {myRank.winMouseCount}승{" "}
                  {myRank.loseMouseCount}패
                </p>
                <p>{(myRank.winMouseRate * 100).toFixed(2)} </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rank;
