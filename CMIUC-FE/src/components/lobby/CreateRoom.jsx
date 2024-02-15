import Modal from "react-modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../api/url/baseURL";

function CreateRoom({ token }) {
  const [roomName, setRoomName] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [roomSize, setRoomSize] = useState(4);
  const navigate = useNavigate();

  const createRoom = async () => {
    if (roomName === "") {
      alert("게임방 제목을 입력해 주십시요.");
      return;
    } else {
      const headers = {
        AUTHORIZATION: token,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/api/games/room`,
          { name: roomName, maxUserCnt: roomSize },
          {
            headers,
          }
        );
        setRoomName("");
        setModalIsOpen(false);
        console.log("방 생성 성공");
        console.log(response);
        const _roomId = response.data.roomId;
        const _roomName = response.data.name;
        navigate(`/game/${_roomId}`, {
          state: {
            _roomId,
            _roomName,
          },
        });
      } catch (error) {
        alert("게임방 개설에 실패하였습니다.");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-xl py-2 px-4 rounded"
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
        className="bg-white rounded-lg p-20 max-w-xl border border-gray-300 relative"
      >
        <div className="flex flex-row justify-items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">방 만들기</h2>
        </div>

        <input
          type="text"
          placeholder="방 이름"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline mb-4"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") createRoom();
          }}
        />
        <div className="mb-4">
          <label
            className="block text-blue-700 text-sm font-bold mb-2"
            htmlFor="room-size"
          >
            방 인원수 선택
          </label>
          <select
            id="room-size"
            value={roomSize}
            onChange={(e) => setRoomSize(e.target.value)}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value={4}>4명</option>
            <option value={5}>5명</option>
            <option value={6}>6명</option>
          </select>
        </div>
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
