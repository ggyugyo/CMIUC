import React, { useEffect, useState } from "react";
import axios from "axios";
import CreateRoom from "./CreateRoom";
import cheese from "../../assets/img/cheese.png";
import refreshIcon from "../../assets/img/refreshIcon.png";
import { BASE_URL } from "../../api/url/baseURL";
import { useNavigate } from "react-router-dom";

// 이후에 소켓 연결해서 지속적으로 방 목록을 받아오도록 해야겠지?
function Rooms({ history }) {
  const [rooms, setRooms] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = rooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
  useEffect(() => {
    findAllRooms();
  }, []);

  const navigate = useNavigate();
  const enterRoom = (roomId, roomName) => {
    axios
      .get(`${BASE_URL}/api/games/room/${roomId}`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
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
    <div className="p-4 border bg-blue-50 min-h-full relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">게임방 목록</h1>
        <button onClick={() => findAllRooms()}>
          <img src={refreshIcon} width="45" height="45"></img>
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {currentRooms.map((room, index) => (
          <div
            key={index}
            onClick={() => enterRoom(room.roomId, room.name)}
            className="rounded overflow-hidden shadow-lg p-6 flex bg-white hover:bg-gray-50 transform hover:scale-105 transition duration-200 ease-in-out h-35"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full mr-4">
              <img
                src={cheese}
                alt="이미지"
                className="w-12 h-12 object-cover"
              />
            </div>

            <div>
              <p className="font-bold text-xl text-gray-700 mb-2 h-10 overflow-hidden whitespace-nowrap overflow-ellipsis w-48">
                {room.name}
              </p>
              <div className="flex items-center">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs font-bold ${
                    room.gameInProgress
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {room.gameInProgress ? "게임 진행중" : "대기중"}
                </span>
                <span className="inline-block bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-bold ml-2">
                  {room.curUserCnt}/6
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-4 absolute bottom-20 w-11/12">
        <div>
          <CreateRoom />
        </div>
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
