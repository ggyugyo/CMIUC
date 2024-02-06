import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { BASE_URL, BACK_URL } from "../../api/url/baseURL";

export const GameChat = ({ sender, roomId, messages, setMessages }) => {
  const [message, setMessage] = useState("");

  // axios 다 되면 소켓 연곃 하라고 합시다 (await 걸고 그래야 합니다??)
  const socket = new SockJS(`${BACK_URL}/ws-stomp`);
  const stompClient = Stomp.over(socket);

  const connectChat = () => {
    stompClient.connect({}, () => {
      console.log("===== 채팅 연결 성공 =====");
      // 방채팅 구독
      stompClient.subscribe(`/sub/games/chat/${roomId}`, (message) => {
        console.log(message);
        const receivedMessage = JSON.parse(message.body);
        console.log("MSG", receivedMessage.data.message);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: receivedMessage.data.sender,
            message: receivedMessage.data.message,
          },
        ]);
      });
      // // 방나가기, 게임진행 구독
      // stompClient.subscribe(`/sub/games/play/${roomId}`, (message) => {
      //   // 구독 성공하면 자동으로 메시지가 온다 그거 받아서 화면에 보여주면 된다.
      //   const receivedMessage = JSON.parse(message.body);
      //   console.log(receivedMessage);
      // });
      // //
      // stompClient.subscribe(`/sub/games/cards/roles/${roomId}`, (message) => {
      //   // 구독 성공하면 자동으로 메시지가 온다 그거 받아서 화면에 보여주면 된다.
      //   const receivedMessage = JSON.parse(message.body);
      //   console.log(receivedMessage);
      // });
    });
  };

  useEffect(() => {
    connectChat();
  }, []);

  const sendMessage = (type) => {
    stompClient.send(
      `/pub/games/room/${roomId}/chat`,
      { accessToken: localStorage.getItem("accessToken") },
      JSON.stringify({ sender: sender, message: message })
    );
    setMessage("");
  };
  // NOTE : 채팅 박스 클릭시 채팅 입력 창에 포커스
  const inputRef = useRef(null);
  const onClickFocusHandler = () => {
    inputRef.current.focus();
  };

  // 채팅 메시지 무한 스크롤
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  return (
    <div
      className="absolute z-10 bottom-[0px] left-[0px] flex flex-col w-[650px] h-[250px] bg-gray-200"
      onClick={onClickFocusHandler}
    >
      <div className="flex-grow overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => {
          return (
            // msg.sender 로 어떻게 바꾸면 될듯?
            <div
              key={index}
              className={`my-2 flex ${
                msg.sender == sender ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender ? `${msg.sender} : ${msg.message}` : msg.message}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-2">
        <input
          type="text"
          value={message}
          ref={inputRef}
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
