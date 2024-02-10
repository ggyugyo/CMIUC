import React, { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../../api/url/baseURL";
import Modal from "react-modal";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";

function FriendChatModal({ isOpen, closeModal, roomId, friendName }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const memberId = localStorage.getItem("id");
  const sender = localStorage.getItem("nickname");
  const token = `Bearer ${localStorage.getItem("accessToken")}`;
  const totalMessageCount = useRef(0);
  const nextMessageId = useRef(0);
  const socket = new SockJS(`${BASE_URL}/ws-stomp`);
  const stompClient = Stomp.over(socket);
  const chatBoxRef = useRef(null);

  const [isNewMessage, setIsNewMessage] = useState(false);

  const stompConnect = () => {
    stompClient.connect({}, () => {
      stompClient.subscribe(`/sub/friends/chat/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            content: receivedMessage.data.message,
            memberId: receivedMessage.data.memberId,
          },
        ]);
        setIsNewMessage(true); //
        // scrollToBottom();
      });
    });
  };

  const fetchMessages = async () => {
    try {
      if (!roomId) return;
      const getCount = await axios.get(
        `${BASE_URL}/api/friends/chat/room/${roomId}/count`,
        {
          headers: {
            AUTHORIZATION: token,
          },
        }
      );
      console.log(getCount.data);
      totalMessageCount.current = getCount.data;

      if (nextMessageId.current <= totalMessageCount.current) {
        const response = await axios.get(
          `${BASE_URL}/api/friends/chat/room/${roomId}/messages/0?size=100`,
          {
            headers: {
              AUTHORIZATION: token,
            },
          }
        );
        console.log(response.data);
        nextMessageId.current += 20;
        setMessages((prevMessages) => [
          ...response.data.content
            .map((msg) => ({
              content: msg.message,
              memberId: msg.memberId,
            }))
            .reverse(), // .reverse()를 추가하여 배열의 순서를 뒤집습니다.
          ...prevMessages,
        ]);
        // scrollToBottom(); // 새로운 메시지 받은 후 스크롤 맨 아래로 이동
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      stompConnect();
    }
    return () => {
      if (stompClient.connected) {
        setMessages([]);
        nextMessageId.current = 0;
        totalMessageCount.current = 0;
        stompClient.disconnect();
      }
    };
  }, [isOpen, roomId]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsNewMessage(false); // 스크롤이 맨 아래로 내려갔음을 알립니다.
  };

  const sendMessage = () => {
    if (stompClient && message) {
      stompClient.send(
        `/pub/friends/chat/${roomId}`,
        { accessToken: localStorage.getItem("accessToken") },
        JSON.stringify({ memberId: memberId, sender: sender, message: message })
      );
      setMessage("");
      scrollToBottom();
    }
  };

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
