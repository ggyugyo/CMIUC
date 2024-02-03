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
      // BE에서 params로 받기 때문에 이렇게 함
      const params = {
        name: roomName,
      };
      const headers = {
        AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
      };
      axios
        .post(
          `http://localhost:8081/chat/room`,
          {},
          {
            params,
            headers,
          }
        )
        .then((response) => {
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
        shouldCloseOnOverlayClick={true}
        overlayClassName="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        className="bg-white rounded-lg p-10 max-w-xl border border-gray-300 relative"
      >
        <button
          onClick={() => setModalIsOpen(false)}
          className="absolute top-4 right-4 text-black hover:text-black-700 text-2xl"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4 text-blue-600">방 만들기</h2>
        <input
          type="text"
          placeholder="방 제목"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") createRoom();
          }}
        />
        <div className="flex justify-between mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 transition duration-200 ease-in-out hover:bg-blue-600 focus:outline-none"
            type="button"
            onClick={createRoom}
          >
            확인
          </button>
          <button
            className="bg-blue-500 text-white border border-gray-300 px-4 py-2 rounded-md transition duration-200 ease-in-out hover:border-gray-500 focus:outline-none"
            type="button"
            onClick={() => setModalIsOpen(false)}
          >
            취소
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default CreateRoom;
