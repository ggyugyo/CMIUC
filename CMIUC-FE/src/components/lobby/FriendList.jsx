import React, { useEffect, useState } from "react";
import axios from "axios";
import AddFriendModal from "../modals/AddFriendModal";
import FriendRequestListModal from "../modals/FriendRequestListModal";
import FriendChatModal from "../modals/FriendChatModal";

import { BASE_URL } from "../../api/url/baseURL";

function FriendList() {
  const userId = localStorage.getItem("id");
  const accessToken = localStorage.getItem("accessToken");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [notification, setNotification] = useState(false);
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [requestListModalIsOpen, setRequsestListModalIsOpen] = useState(false);
  const [message, setMessage] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [chatModalIsOpen, setChatModalIsOpen] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [friendName, setFriendName] = useState("");

  useEffect(() => {
    findAllFriends();
    checkFriendRequest();
  }, []);

  const findAllFriends = () => {
    axios
      .get(`${BASE_URL}/api/friends/${userId}`, {
        headers: {
          AUTHORIZATION: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setFriends(response.data);
        }
      });
  };

  const openModal = () => setAddModalIsOpen(true);
  const closeModal = () => setAddModalIsOpen(false);
  const openRModal = () => setRequsestListModalIsOpen(true);
  const closeRModal = () => setRequsestListModalIsOpen(false);
  const openChat = (roomId, friendName) => {
    setRoomId(roomId);
    setChatModalIsOpen(true);
    setFriendName(friendName);
  };
  const closeChat = () => setChatModalIsOpen(false);

  const filteredFriends = friends.filter((friend) =>
    friend.friendName.includes(searchValue)
  );

  const addFriendRequest = () => {
    axios
      .post(
        `${BASE_URL}/api/friends/request`,
        {
          senderId: userId,
          receiverNickname: nameInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        setNameInput("");
        if (response.data === true) {
          alert("친구 신청을 보냈습니다.");
          setAddModalIsOpen(false);
          checkFriendRequest();
        } else {
          alert("이미 친구이거나 친구신청을 보낸 유저 입니다");
          checkFriendRequest();
        }
      })
      .catch((error) => {
        alert("존재하지 않는 유저입니다");
        checkFriendRequest();
      });
  };

  const checkFriendRequest = () => {
    axios
      .get(`${BASE_URL}/api/friends/${userId}/friend-requests`, {
        headers: {
          AUTHORIZATION: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setRequests(response.data);
          setNotification(response.data.length > 0);
        }
      });
  };

  const acceptRequest = (friendId) => {
    axios
      .post(
        `${BASE_URL}/api/friends/accept`,
        {},
        {
          params: {
            friendId: friendId,
          },
          headers: {
            AUTHORIZATION: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          findAllFriends();
          checkFriendRequest();
          alert("님과 친구가 되었습니다");
        }
        closeRModal();
      });
  };

  const rejectRequest = (friendId) => {
    axios
      .post(
        `${BASE_URL}/api/friends/reject`,
        {},
        {
          params: {
            friendId: friendId,
          },
          headers: {
            AUTHORIZATION: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (Array.isArray(response.data)) {
          checkFriendRequest();
          findAllFriends();
        }
      });
  };

  return (
    <div
      className="border flex flex-col"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="pt-3 pl-3 pr-3 w-fit font-sans font-extrabold text-2xl text-blue-700">
          친구 목록
        </h1>
        <div className="flex items-center pt-3 pl-3 pr-3">
          <button onClick={openModal} className="mr-2">
            친구추가
          </button>
          <button onClick={openRModal} className="relative">
            친구요청
            {requests.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {requests.length}
              </span>
            )}
          </button>
        </div>
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="닉네임"
        className="m-4 p-2 border border-gray-300 rounded-md"
      />
      <div
        className=" h-72 overflow-y-auto border p-2 rounded  shadow-md"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5))",
        }}
      >
        {filteredFriends.map((friend, index) => (
          <div
            key={index}
            onClick={() => openChat(friend.roomId, friend.friendName)}
            className="flex justify-between items-center border my-1 p-2 rounded bg-white shadow-md cursor-pointer"
          >
            <h6 className="font-bold text-lg text-blue-700">
              {friend.friendName}
            </h6>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              채팅하기
            </button>
          </div>
        ))}
      </div>

      <AddFriendModal
        isOpen={addModalIsOpen}
        closeModal={closeModal}
        nameInput={nameInput}
        setNameInput={setNameInput}
        addFriendRequest={addFriendRequest}
      />

      <FriendRequestListModal
        isOpen={requestListModalIsOpen}
        closeModal={closeRModal}
        requests={requests}
        acceptRequest={acceptRequest}
        rejectRequest={rejectRequest}
      />

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
