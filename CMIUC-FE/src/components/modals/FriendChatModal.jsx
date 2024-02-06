// FriendChatModal 컴포넌트
import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../api/url/baseURL";
import Modal from "react-modal";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";

function FriendChatModal({ isOpen, closeModal, roomId, friendName }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const memberId = localStorage.getItem("id");
  const sender = localStorage.getItem("nickname");

  const token = `Bearer ${localStorage.getItem("accessToken")}`;

  useEffect(() => {
    if (isOpen) {
      // 엔드포인트 설정, SockJS와 Stomp를 사용해서 웹소켓 설정
      const socket = new SockJS(`${BASE_URL}:8081/ws-stomp`);
      const stompClient = Stomp.over(socket);
      axios
        .get(`${BASE_URL}:8081/api/friends/chat/room/${roomId}/count`, {
          headers: {
            AUTHORIZATION: token,
          },
        })
        .then((res) => {
          const newPage = 2;
          console.log(messagePage);
          axios
            .get(
              `${BASE_URL}:8081/api/friends/chat/room/${roomId}/messages?page=${messagePage}`,
              {
                headers: {
                  AUTHORIZATION: token,
                },
              }
            )
            .then((response) => {
              console.log(response);

              setMessages((prevMessages) => [
                ...prevMessages,
                ...response.data.content.map((msg) => ({
                  content: msg.message,
                  memberId: msg.memberId,
                })),
              ]);
            });
        });

      // 엔드포인트로 연결
      stompClient.connect({}, () => {
        // 연결이 완료되면 해당 방의 채팅을 구독
        stompClient.subscribe(`/sub/friends/chat/${roomId}`, (message) => {
          // 구독 성공하면 자동으로 메시지가 온다 그거 받아서 화면에 보여주면 된다.
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage.data);
          console.log(receivedMessage.data.memberId != memberId);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              content: receivedMessage.data.message,
              memberId: receivedMessage.data.memberId,
            },
          ]);
        });
      });

      setStompClient(stompClient);
    }

    return () => {
      if (stompClient) {
        setMessages([]);
        stompClient.disconnect();
      }

      setStompClient(null);
    };
  }, [isOpen, roomId]);

  const sendMessage = () => {
    if (stompClient && message) {
      stompClient.send(
        `/pub/friends/chat/${roomId}`,
        { accessToken: localStorage.getItem("accessToken") },
        JSON.stringify({ memberId: memberId, sender: sender, message: message })
      );
      // 메시지 보낸 후에는 input 초기화
      setMessage("");
    }
  };

  // 채팅창 부드럽게 스크롤 ^^
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          width: "50%",
          height: "70%",
          margin: "auto",
          padding: "20px",
          background: "#ebf8ff",
          border: "1px solid",
          borderRadius: "10px",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
      }}
    >
      <style>
        {`
    ::-webkit-scrollbar {
      width: 8px;
    }

    ::-webkit-scrollbar-track {
      background-color: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background-color: #a5b4fc;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #818cf8;
    }
    `}
      </style>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-blue-600">{friendName}</h2>
          <button
            onClick={closeModal}
            className="p-2 bg-red-500 text-white rounded"
          >
            닫기
          </button>
        </div>
        <div
          id="chat-messages"
          className="h-5/6 overflow-y-scroll border p-4 rounded bg-white shadow-md scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-blue-100"
        >
          {messages.map((msg, index) => (
            <div
              className={`my-2 flex ${
                msg.memberId == memberId ? "justify-end" : "justify-start"
              }`}
            >
              <div
                key={index}
                className={`p-2 rounded-lg w-auto ${
                  msg.memberId == memberId
                    ? "bg-blue-300 text-left"
                    : "bg-gray-200"
                }`}
              >
                <p
                  className={`text-lg ${
                    msg.memberId == memberId ? "text-white" : "text-gray-800"
                  }`}
                  style={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    wordBreak: "break-all",
                  }}
                >
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>
        <div className="mt-4 flex justify-between items-center border p-2 rounded bg-white shadow-md">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
                e.preventDefault();
              }
            }}
            className="w-4/5 mr-4 p-2 rounded border"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            메시지 보내기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default FriendChatModal;
