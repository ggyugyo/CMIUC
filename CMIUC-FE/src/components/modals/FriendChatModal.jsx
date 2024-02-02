// FriendChatModal 컴포넌트
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";

import { Client } from "@stomp/stompjs";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    height: "50%",
  },
};

function FriendChatModal({ isOpen, closeModal, roomId }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const socket = new SockJS(`http://localhost:8080/ws-chat/`);
      const stompClient = Stomp.over(socket);
      var headers = {
        AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      stompClient.connect(
        { AUTHORIZATION: `Bearer ${localStorage.getItem("accessToken")}` },
        (frame) => {
          console.log("Connected: " + frame);
          stompClient.subscribe("/sub/friends/chat/roomId", (message) => {
            const receivedMessage = JSON.parse(message.body);
            console.log(receivedMessage);
          });
        },
        (error) => {
          console.log("STOMP error: " + error);
        }
      );

      // // 메시지 보내기
      // stompClient.send(
      //   "/pub/chat/roomId",
      //   {},
      //   JSON.stringify({ content: "Hello, world!" })
      // );

      // const client = new Client({
      //   brokerURL: "ws://localhost:8080/ws-chat/",
      //   onConnect: () => {
      //     client.subscribe(`/sub/friends/chat/${roomId}`, (message) => {
      //       const receivedMessage = JSON.parse(message.body);
      //       setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      //     });
      //     client.publish({ destination: `/pub/chat/${roomId}`, body: "test" });
      //   },
      // });
      // client.activate();

      var headers = {
        login: "mylogin",
        passcode: "mypasscode",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      };

      setStompClient(stompClient);
    }

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }

      setStompClient(null);
    };
  }, [isOpen, roomId]);

  const sendMessage = () => {
    if (stompClient && message) {
      stompClient.send(
        `/pub/chat/${roomId}`,
        {},
        JSON.stringify({ content: message })
      );

      // Add sent message to the messages state
      setMessages((prevMessages) => [...prevMessages, { content: message }]);

      // Clear input field
      setMessage("");
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
      <h2>친구 채팅</h2>
      <div id="chat-messages" style={{ height: "70%", overflowY: "scroll" }}>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              // 엔터 키가 눌렸을 때 sendMessage 호출
              sendMessage();
              e.preventDefault(); // 엔터 키 기본 동작(폼 제출) 방지
            }
          }}
          style={{ width: "80%", marginRight: "1rem" }}
        />
        <button onClick={sendMessage}>메시지 보내기</button>
      </div>
      <button onClick={closeModal} style={{ marginTop: "1rem" }}>
        닫기
      </button>
    </Modal>
  );
}

export default FriendChatModal;
