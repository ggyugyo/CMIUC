import React, { useEffect, useState } from "react";
import axios from "axios";
import AddFriendModal from "../modals/AddFriendModal";
import FriendRequestListModal from "../modals/FriendRequestListModal";
import FriendChatModal from "../modals/FriendChatModal";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { yellow } from "@mui/material/colors";
import { BASE_URL } from "../../api/url/baseURL";
import Swal from "sweetalert2";

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

  // react-toastify

  // 친구목록과 친구요청 목록을 불러온다.
  useEffect(() => {
    findAllFriends();
    checkFriendRequest();
  }, []);

  // 친구목록 불러오기
  const findAllFriends = () => {
    axios
      .get(`${BASE_URL}/api/friends/${userId}`, {
        headers: {
          AUTHORIZATION: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log("친구목록 조회 성공");
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

  // 친구신청하기
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
          setAddModalIsOpen(false);
          checkFriendRequest();
          let timerInterval;
          Swal.fire({
            title: `${nameInput}님에게
            친구신청을 보냈습니다`,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
        } else {
          checkFriendRequest();
          let timerInterval;
          Swal.fire({
            title: `이미 친구이거나
            친구 요청을 보낸 상태입니다`,
            timer: 1500,
            timerProgressBar: true,
            didOpen: () => {
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
        }
      })
      .catch((error) => {
        checkFriendRequest();
        let timerInterval;
        Swal.fire({
          title: `존재하지 않는 유저입니다`,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      });
  };

  // 친구요청목록 불러오기
  const checkFriendRequest = () => {
    axios
      .get(`${BASE_URL}/api/friends/${userId}/friend-requests`, {
        headers: {
          AUTHORIZATION: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          console.log("친구요청 목록 조회 성공");
          setRequests(response.data);
          setNotification(response.data.length > 0);
        }
      });
  };

  //친구요청 승인
  const acceptRequest = async (friendId) => {
    try {
      const response = await axios.post(
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
      );

      if (Array.isArray(response.data)) {
        closeRModal();
        findAllFriends();
        checkFriendRequest();
        let timerInterval;
        Swal.fire({
          title: `${nameInput}님에게
          친구신청을 보냈습니다`,
          timer: 1500,
          timerProgressBar: true,
          didOpen: () => {
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
      closeRModal();
    } catch (error) {
      console.error("친구요청 승인 에러", error);
    }
  };

  // 친구요청 거절
  const rejectRequest = async (friendId) => {
    try {
      const response = axios.post(
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
      );
      if (Array.isArray(response.data)) {
        checkFriendRequest();
        findAllFriends();
        alert("친구요청을 거절했습니다");
      }
      closeRModal();
    } catch (error) {
      console.error("친구요청 거절 에러", error);
    }
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
            <PersonAddAlt1Icon sx={{ color: yellow[50] }} fontSize="large" />
          </button>
          <button onClick={openRModal} className="relative">
            <NotificationsIcon fontSize="large" sx={{ color: yellow[500] }} />
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
