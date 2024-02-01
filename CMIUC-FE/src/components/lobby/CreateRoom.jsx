import Modal from "react-modal";
import { useState } from "react";
import axios from "axios";

function CreateRoom() {
  const [roomName, setRoomName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal의 상태를 관리하는 state

  const enterRoom = (roomId, roomName) => {
    localStorage.setItem("wschat.roomId", roomId);
    localStorage.setItem("wschat.roomName", roomName);
    // 아래 주소로 이동하는데 이건 나중에 수정이 필요하다
    window.location.href = "/chat/room/enter/" + roomId;
  };

  // 방 입장 하면 그 안에서 stomp 연결 해야함 !!!!
  const createRoom = () => {
    if (roomName === "") {
      alert("게임방 제목을 입력해 주십시요.");
      return;
    } else {
      const params = new URLSearchParams();
      params.append("name", roomName);
      axios
        .post(`http://localhost:8080/chat/room?name=${roomName}`, params, {
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response);
          alert(response.data.name + " 게임방 개설에 성공하였습니다.");
          setRoomName("");
          setModalIsOpen(false); // 방을 만들면 모달을 닫습니다.
          // enterRoom(response.data.roomId, response.data.name); // 새로 만든 방으로 입장합니다.
        })
        .catch((response) => {
          alert("게임방 개설에 실패하였습니다.");
        });
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="button"
          onClick={() => setModalIsOpen(true)}
        >
          방 만들기
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            width: "400px",
            height: "200px",
            backgroundColor: "#f5f5f5", // 배경색 변경
            padding: "20px", // 패딩 추가
            display: "flex", // 플렉스박스로 변경
            flexDirection: "column", // 요소들을 세로로 배치
            justifyContent: "center", // 요소들을 세로 중앙에 배치
            alignItems: "center", // 요소들을 가로 중앙에 배치
          },
        }}
      >
        <h2>게임방 제목을 입력해주세요</h2>
        <input
          type="text"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") createRoom();
          }}
        />
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={createRoom}
          >
            방 만들기
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            type="button"
            onClick={() => setModalIsOpen(false)}
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CreateRoom;
