import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/url/baseURL";

const GameChatConnect = ({ match }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState("");
  const accessToken = localStorage.getItem("accessToken");
  const [userCount, setUserCount] = useState(0);
  const [ws, setWs] = useState(null);
  const roomId = match.params.roomId;

  const sender = localStorage.getItem("nickname");
  // axios 다 되면 소켓 연곃 하라고 합시다 (await 걸고 그래야 합니다??)

  const checkAvailableEnter = () => {
    axios
      .get(`http://localhost:8081/api/games/room/${roomId}`, {
        headers: {
          AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setToken(response.data.token);
        const sock = new SockJS(`${BASE_URL}:8081/ws-stomp`); //endpoint
        const ws = over(sock);
        setWs(ws);
        ws.connect(
          {
            token: token,
            type: "ENTER",
            sender: sender,
            message: "",
          },
          function (frame) {
            console.log("소켓 연결 성공 : roonID :", roomId);
            ws.subscribe(`/chat/${roomID}/enter`, function (message) {
              console.log("구독 완료");
              var recv = JSON.parse(message.body);
              recvMessage(recv);
            });
          },
          function (error) {
            console.log(error);
            alert("서버 연결에 실패 하였습니다. 다시 접속해 주십시요.");
            // location.href = "/lobby";
          }
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  useEffect(() => {
    checkAvailableEnter();
  }, []);

  const sendMessage = (type) => {
    ws.send(
      `/pub/rooms/${roomId}`,
      { token: accessToken },
      JSON.stringify({ sender: sender, message: message })
    );
    setMessage("");
  };

  const recvMessage = (recv) => {
    setUserCount(recv.userCount);
    setMessages((prevMessages) => [
      { type: recv.type, sender: recv.data.sender, message: recv.data.message },
      ...prevMessages,
    ]);
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
