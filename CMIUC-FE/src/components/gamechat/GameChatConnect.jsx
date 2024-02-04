import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useParams } from "react-router-dom";

const GameChatConnect = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState("");
  const headers = {
    AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
  };
  const [userCount, setUserCount] = useState(0);
  const [ws, setWs] = useState(null);
  const { roomId } = useParams();

  const sender = localStorage.getItem("nickname");
  // axios 다 되면 소켓 연곃 하라고 합시다 (await 걸고 그래야 합니다??)
  const socket = new SockJS("http://localhost:8081/ws-stomp");
  const stompClient = Stomp.over(socket);

  const connectStomp = () => {
    stompClient.connect(
      { AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}` },
      () => {
        console.log("방 입장 성공");
        stompClient.subscribe(`/sub/chat/room/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
        });
        // 방 입장, 게임시작
        stompClient.subscribe(`/sub/games/wait/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
        });
        // 방채팅 및 방나가기, 게임진행 구독
        stompClient.subscribe(`/sub/games/play/${roomId}`, (message) => {
          // 구독 성공하면 자동으로 메시지가 온다 그거 받아서 화면에 보여주면 된다.
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
        });
        //
        stompClient.subscribe(`/sub/games/cards/roles/${roomId}`, (message) => {
          // 구독 성공하면 자동으로 메시지가 온다 그거 받아서 화면에 보여주면 된다.
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);
        });
      }
    );
  };

  useEffect(() => {
    connectStomp();
  }, []);

  const sendMessage = (type) => {
    stompClient.send(
      `/pub/rooms/${roomId}/chat`,
      { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      JSON.stringify({ sender: sender, message: message })
    );
    setMessage("");
  };

  // 채팅 메시지 무한 스크롤 하려고 만든거
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div
      className="flex flex-col h-screen bg-gray-200"
      style={{ maxHeight: "30vh", maxWidth: "400px" }}
    >
      <div className="flex-grow overflow-y-auto p-3 space-y-2">
        {messages
          .slice(0)
          .reverse()
          .map((msg, index) => {
            const myMessage =
              "bg-blue-500 text-white p-2 rounded-l-lg rounded-t-lg";
            const otherMessage =
              "bg-gray-300 text-black p-2 rounded-r-lg rounded-t-lg";
            return (
              // msg.sender 로 어떻게 바꾸면 될듯?
              <div
                key={index}
                className={`my-2 ${
                  msg.sender === "me" ? myMessage : otherMessage
                }`}
              >
                {msg.sender === "me" ? "나: " : `${msg.sender}: `}
                {msg.message}
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          className="flex-grow p-2 rounded-l-lg border border-gray-400"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default GameChatConnect;
