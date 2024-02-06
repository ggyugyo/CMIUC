import React, { useEffect, useState } from "react";
import axios from "axios";
import AddFriendModal from "../modals/AddFriendModal";
import FriendRequestListModal from "../modals/FriendRequestListModal";
import AlarmIcon from "../../assets/img/alarm.png";
import AddFriendIcon from "../../assets/img/addfriend.png";
import FriendChatModal from "../modals/FriendChatModal";
import { BASE_URL, BACK_URL } from "../../api/url/baseURL";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function FriendList() {
  const [friends, loadFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState(false);
  const userId = localStorage.getItem("id");
  const accessToken = localStorage.getItem("accessToken");
  const userNickname = localStorage.getItem("nickname");
  const [addModalIsOpen, setAddModalIsOpen] = useState(false); // 모달 열림 상태 추가
  const [requestListModalIsOpen, setRequsestListModalIsOpen] = useState(false);

  const [message, setMessage] = useState([]); // 메세지 상태 추가

  const openModal = () => {
    setAddModalIsOpen(true);
  };
  const closeModal = () => {
    setAddModalIsOpen(false);
  };
  const openRModal = () => {
    setRequsestListModalIsOpen(true);
  };
  const closeRModal = () => {
    setRequsestListModalIsOpen(false);
  };

  // 친구 목록 조회하는 함수
  const findAllFriends = () => {
    axios
      .get(`${BACK_URL}/api/friends/${userId}`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          // console.log(response.data);
          loadFriends(response.data);
        }
      });
  };

  useEffect(() => {
    findAllFriends();
    checkFriendRequest();
  }, []);

  // 친구 신청을 위해 친구 닉네임을 입력하는 input 상태 추가
  const [nameInput, setNameInput] = useState("");
  // 친구 신청 보내는 함수
  const addFriendRequest = () => {
    axios
      .post(
        `${BACK_URL}/api/friends/request`,
        {
          senderId: userId,
          receiverNickname: nameInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        setNameInput(""); // 친구 신청 보내고 나면 모달 input 초기화
        if (response.data == true) {
          alert("친구 신청을 보냈습니다.");
          setAddModalIsOpen(false);
          checkFriendRequest();
        } else {
          alert("이미 친구이거나 친구신청을 보낸 유저 입니다");
          checkFriendRequest();
        }
      })
      .catch((response) => {
        alert("존재하지 않는 유저입니다");
        checkFriendRequest();
      });
  };

  // 친구요청목록 조회
  const checkFriendRequest = () => {
    axios
      .get(`${BACK_URL}/api/friends/${userId}/friend-requests`, {
        headers: {
          AUTHORIZATION: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          if (response.data.length) {
            // 친구 요청목록을 받아와서 requests 에 저장
            setRequests(response.data);
            // 친구 요청이 있으면 알림을 띄워줌
            setNotification(true);
          } else {
            console.log("친구요청 없음");
            setNotification(false);
          }
        }
      });
  };

  // 친구요청 수락하는 함수
  const acceptRequest = (friendId) => {
    axios
      .post(
        `${BACK_URL}/api/friends/accept`,
        {},
        {
          params: {
            friendId: friendId,
          },
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          // 요청 수락했으니까 친구목록 새로고침
          findAllFriends();
          // 친구신청목록도 새로고침
          checkFriendRequest();
          alert("님과 친구가 되었습니다");
        }
        console.log(response);
        findAllFriends();
        checkFriendRequest();
        closeRModal();
      });
  };

  // 친구요청 거절하는 함수
  const rejectRequest = (friendId) => {
    axios
      .post(
        `${BACK_URL}/api/friends/reject`,
        {},
        {
          params: {
            friendId: friendId,
          },
          headers: {
            AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          // 거절 ㅇㅇ
          // 거절했으니까 친구신청목록 새로고침하면 없어져야함 ㅇㅇ
          checkFriendRequest();
          findAllFriends();
        }
        checkFriendRequest();
        findAllFriends();
      });
  };

  // 채팅 모달 열림 상태 및 웹소켓 클라이언트 상태 추가
  const [chatModalIsOpen, setChatModalIsOpen] = useState(false);
  const [roomId, setRoomId] = useState(null); // 채팅방 ID 상태 추가
  const [friendName, setFriendName] = useState("");
  const openChat = (roomId, friendName) => {
    setRoomId(roomId); // 채팅방 ID 상태 업데이트
    setChatModalIsOpen(true);
    setFriendName(friendName);
  };

  // 친구 채팅 닫는 함수
  const closeChat = () => {
    setChatModalIsOpen(false);
  };

  return (
    <div className="border p-4 flex flex-col space-y-4 bg-blue-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold  text-blue-600">친구 목록</h1>
        <div className="flex items-center">
          <button onClick={() => setAddModalIsOpen(true)} className="mr-2">
            <img src={AddFriendIcon} alt="친구추가" width={48} />
          </button>

          <button
            onClick={() => setRequsestListModalIsOpen(true)}
            className="relative"
          >
            <img src={AlarmIcon} alt="친구신청목록" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
              {requests.length}
            </span>
          </button>
        </div>
      </div>
      {friends.map((friend, index) => (
        <div
          key={index}
          className="flex justify-between items-center border p-2 rounded bg-white shadow-md"
        >
          <h6 className="font-bold text-xl text-blue-700">
            {friend.friendName}
          </h6>
          <button
            onClick={() => openChat(friend.roomId, friend.friendName)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            채팅방 입장
          </button>
        </div>
      ))}

      {/* 친구 추가 모달 */}

      <AddFriendModal
        isOpen={addModalIsOpen}
        closeModal={closeModal}
        nameInput={nameInput}
        setNameInput={setNameInput}
        addFriendRequest={addFriendRequest}
      />

      {/* 친구 신청 목록 모달 */}
      <FriendRequestListModal
        isOpen={requestListModalIsOpen}
        closeModal={closeRModal}
        requests={requests}
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
      />

      {/* 친구 채팅 모달 */}
      <FriendChatModal
        isOpen={chatModalIsOpen}
        closeModal={closeChat}
        roomId={roomId}
        friendName={friendName}
      />
    </div>
  );
}

export default FriendList;
