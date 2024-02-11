import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateRoom from "./CreateRoom";
import cheese from "../../assets/img/cheese.png";
import refreshIcon from "../../assets/img/refreshIcon.png";
import { BASE_URL } from "../../api/url/baseURL";
import { useNavigate } from "react-router-dom";

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
          // 받아온 데이터를 rooms 담아준다.
          setRooms(response.data);
        }
      });
  };

  const enterRoom = (roomId) => {
    axios
      .get(`${BASE_URL}/api/games/room/${roomId}`, {
        headers: {
          AUTHORIZATION: token,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          navigate(`/game/${roomId}`, {
            state: {
              roomId,
            },
          });
        } else {
          alert(
            "게임방 인원이 가득 찼거나 이미 진행중인 방입니다. 다른 방을 이용해주세요."
          );
        }
      });
  };

  return (
    <div
      className="p-4 border min-h-full relative"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-sans font-extrabold text-2xl text-blue-600">
          게임방 목록
        </h1>
        <div className="flex flex-row">
          <CreateRoom token={token} />
          <button onClick={() => findAllRooms()} className="ml-4">
            <img src={refreshIcon} width="40" height="40"></img>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {currentRooms.map((room, index) => (
          <div
            key={index}
            onClick={() => enterRoom(room.roomId)}
            className="rounded overflow-hidden shadow-lg p-6 fle hover:bg-gray-50 transform hover:scale-105 transition duration-200 ease-in-out"
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

            <div className="flex mt-4 justify-end ">
              <div className="items-center text-md">
                <span
                  className={`inline-block rounded-full px-2 py-1 text- font-bold ${
                    room.gameInProgress
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {room.gameInProgress ? "게임 진행중" : "대기중"}
                </span>
                <span className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 font-bold ml-2">
                  {room.curUserCnt}/6
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end justify-items-center fixed right-5 bottom-5 my-3 ">
        <div>
          {[...Array(Math.ceil(rooms.length / roomsPerPage))].map((e, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mr-1 p-1 border rounded ${
                i + 1 === currentPage ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Rooms;
