import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateRoom from "./CreateRoom";
import cheese from "../../assets/img/cheese.png";
import SyncIcon from "@mui/icons-material/Sync";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { BASE_URL } from "../../api/url/baseURL";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// 이후에 소켓 연결해서 지속적으로 방 목록을 받아오도록 해야겠지?
function Rooms() {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);

  const token = "Bearer " + localStorage.getItem("accessToken");

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    findAllRooms();
  }, []);

  // 이후에 소켓 연결해서 지속적으로 방 목록을 받아 오도록 하면 좋지않을까
  // 방 목록 불러오는 함수
  const findAllRooms = () => {
    axios
      .get(`${BASE_URL}/api/games/rooms`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (
          Object.prototype.toString.call(response.data) === "[object Array]"
        ) {
          console.log("방 목록 조회 성공");

          // 받아온 데이터를 원하는 기준에 따라 정렬한다.
          response.data.sort((a, b) => {
            let aDiff = a.maxUserCnt - a.curUserCnt;
            let bDiff = b.maxUserCnt - b.curUserCnt;

            if (aDiff === 0) aDiff += 1000; // 0인 경우에는 큰 수를 더해줍니다.
            if (bDiff === 0) bDiff += 1000;

            if (a.gameInProgress && !b.gameInProgress) {
              return aDiff - bDiff + 1; // 게임 진행중인 A 방이 게임 진행중이지 않은 B 방보다 뒤에 오도록
            } else if (!a.gameInProgress && b.gameInProgress) {
              return aDiff - bDiff - 1; // 게임 진행중이지 않은 A 방이 게임 진행중인 B 방보다 앞에 오도록
            } else {
              return aDiff - bDiff; // 나머지 경우에는 차이가 적은 방이 앞에 오도록
            }
          });

          // 정렬된 데이터를 rooms에 담아준다.
          setRooms(response.data);
        }
      });
  };

  const enterRoom = (_roomId) => {
    axios
      .get(`${BASE_URL}/api/games/${_roomId}`, {
        headers: {
          AUTHORIZATION: token,
        },
      })
      .then((response) => {
        console.log(response);
        const _roomName = response.data;
        if (response.status === 200) {
          navigate(`/game/${_roomId}`, {
            state: {
              _roomId,
              _roomName,
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "이런...",
            text: "게임방 인원이 가득 찼거나 이미 진행중인 방입니다. 다른 방을 이용해주세요.",
          });
        }
      })
      .catch((error) => {
        findAllRooms();
        Swal.fire({
          icon: "error",
          title: "이런...",
          text: "게임방 인원이 가득 찼거나 이미 진행중인 방입니다. 다른 방을 이용해주세요.",
        });
      });
  };

  return (
    <div
      className="flex flex-col justify-between p-4 border min-h-full relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-extrabold text-3xl text-blue-600">게임방 목록</h1>
        <div className="flex flex-row">
          <CreateRoom token={token} />
          <button onClick={() => findAllRooms()} className="ml-4">
            <SyncIcon sx={{ fontSize: 40 }} color="primary" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {currentRooms.map((room, index) => (
          <div
            key={index}
            onClick={() => enterRoom(room.roomId)}
            className="rounded overflow-hidden shadow-lg p-5 fle hover:bg-gray-50 transform hover:scale-105 transition duration-200 ease-in-out"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8))",
            }}
          >
            <div className="flex justify-between  text-white rounded-full max-h-12 ">
              <img
                src={cheese}
                alt="이미지"
                className=" w-24 h-24 object-cover ml-4 bg-blue-500 rounded-2xl"
              />
              <p className="font-bold text-3xl text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis">
                {room.name}
              </p>
            </div>

            <div className="flex mt-2 justify-end ">
              <div className=" text-md">
                <span
                  className={`inline-block rounded-full px-5 py-2 font-bold text-lg ${
                    room.gameInProgress ? "bg-red-500 text-white" : ""
                  }`}
                  style={
                    room.gameInProgress
                      ? {}
                      : { backgroundColor: "#6FFACC", color: "#434656" }
                  }
                >
                  {room.gameInProgress ? "게임 진행중" : "대기중"}
                  <span className="ml-4">
                    {room.curUserCnt}/{room.maxUserCnt}
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
        {Array(8 - currentRooms.length)
          .fill()
          .map((_, index) => (
            <div
              key={`dummy-${index}`}
              className="rounded overflow-hidden shadow-lg p-6 min-h-[140px]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2))",
              }}
            >
              <div className="flex justify-between text-white rounded-full max-h-12 opacity-0">
                <img
                  alt="dummy"
                  className="w-24 h-24 object-cover ml-4 bg-blue-500 rounded-2xl"
                />
                <p className="font-bold text-3xl text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis"></p>
              </div>
              <div className="flex mt-4 justify-end opacity-0">
                <div className="text-md">
                  <span className="inline-block rounded-full px-5 py-2 font-bold text-lg"></span>
                  <span className="inline-block bg-slate-500 text-white rounded-full px-2 py-2 font-bold ml-2"></span>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div
        className="flex justify-center justify-items-center mt-10"
        style={{ position: "sticky", bottom: 0 }}
      >
        <div>
          {/* 이전 페이지 버튼 */}
          <button onClick={() => currentPage > 1 && paginate(currentPage - 1)}>
            <ArrowBackIosIcon fontSize="large" color="primary" />
          </button>

          {[...Array(Math.ceil(rooms.length / roomsPerPage))].map((e, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`p-3 border rounded mr-2 ${
                i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() =>
              currentPage < Math.ceil(rooms.length / roomsPerPage) &&
              paginate(currentPage + 1)
            }
          >
            <ArrowForwardIosIcon fontSize="large" color="primary" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Rooms;
