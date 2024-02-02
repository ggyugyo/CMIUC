import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import AddFriendModal from "../modals/AddFriendModal";
import FriendRequestListModal from "../modals/FriendRequestListModal";
import AlarmIcon from "../../assets/img/alarm.png";
import AddFriendIcon from "../../assets/img/addfriend.png";
function FriendList() {
  const [friends, loadFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState(false);
  const userId = localStorage.getItem("id");
  const userNickname = localStorage.getItem("nickname");
  const [addModalIsOpen, setAddModalIsOpen] = useState(false); // 모달 열림 상태 추가
  const [requestListModalIsOpen, setRequsestListModalIsOpen] = useState(false);

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

  // 입력한 친구 닉네임 상태 추가
  const [friendName, setFriendName] = useState("");

  // 친구 목록 조회하는 함수
  const findAllFriends = () => {
    axios
      .get(`http://localhost:8081/api/friends/${userId}`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          loadFriends(response.data);
        }
      });
  };

  useEffect(() => {
    findAllFriends();
    checkFriendRequest();
  }, []);

  // 친구 신청 보내는 함수
  const addFriendRequest = () => {
    const requestData = {
      receiverNickname: friendName,
      senderId: userId,
    };
    axios
      .post(`http://localhost:8081/api/friends/request`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: {
          requestData,
        },
      })
      .then((response) => {
        console.log(response);
        alert("친구 추가 완료 ^^");
        findAllFriends();
        setAddModalIsOpen(false);
      })
      .catch((response) => {
        alert("이미 친구이거나 친구신청을 보낸 유저 또는 없는 유저입니다");
      });
  };

  // 친구요청목록 조회
  const checkFriendRequest = () => {
    axios
      .get(`http://localhost:8081/api/friends/${userId}/friend-requests`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          if (response.data.length) {
            console.log(response.data);
            setRequests(response.data);
            console.log(requests);
            setNotification(true);
          } else {
            setNotification(false);
          }
        }
      });
  };

  // 친구요청 수락하는 함수
  const acceptRequest = () => {
    axios
      .post(`http://localhost:8081/친구요청수락`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          // 요청 수락했으니까 친구목록 새로고침
          findAllFriends();
          // 친구신청목록도 새로고침
          checkFriendRequest();
          alert("님과 친구가 되었습니다");
        }
      })
      .catch(() => {
        alert("아직 안만듬");
      });
  };

  // 친구요청 거절하는 함수
  const rejectRequest = () => {
    axios
      .post(`http://localhost:8081/친구요청거절`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log(response.data);
          // 거절 ㅇㅇ
          // 거절했으니까 친구신청목록 새로고침하면 없어져야함 ㅇㅇ
          checkFriendRequest();
        }
      })
      .catch(() => {
        alert("아직 안만듬");
      });
  };

  // 친구 채팅 여는 함수인데 구현 해야함
  const openChat = (roomId, friendName) => {
    alert("기능구현중입니다.");
  };

  return (
    <div className="border p-4 flex flex-col space-y-4 bg-blue-50">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-600">친구 목록</h1>
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
        friendName={friendName}
        setFriendName={setFriendName}
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
    </div>
  );
}

export default FriendList;
