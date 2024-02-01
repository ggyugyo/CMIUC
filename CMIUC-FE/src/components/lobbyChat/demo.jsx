import React, { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatRoomCreation from "./ChatRoomCreation";

export default function FriendChat() {
    const { roomId } = useParams();
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [token, setToken] = useState("");
    const [userData, setUserData] = useState({
        data: {
            sender: "",
            content: "",
        },
    });

    const stompClientRef = useRef(null);

    const failToConnect = () => {
        console.log("ERROR가 났어욜");
    };

    useEffect(() => {
        axios.get("http://localhost:8080/chat/user")
            .then((res) => {
                setToken(res.data.token);
            })
            .catch(failToConnect);
    }, []);

    useEffect(() => {
        if (token && !stompClient) {
            const socket = new SockJS("http://localhost:8080/ws-stomp");
            const stomp = Stomp.over(socket);
            setStompClient(stomp);

            stomp.connect({ "token": token }, () => {
                console.log("connected; roomId : " + roomId);
                stomp.subscribe(`/sub/friends/chat/room/${roomId}`, (msg) => {
                    const receivedMessage = JSON.parse(msg.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            }, failToConnect);

            // 컴포넌트가 언마운트될 때 소켓 연결 정리
            return () => {
                if (stompClientRef.current) {
                    stompClientRef.current.disconnect();
                }
            };
        }
    }, [token, roomId]);

    const handleSendMsg = () => {
        if (stompClient && inputMessage.trim() !== "") {
            const newMessage = {
                sender: "아무개씨",
                content: inputMessage,
            };

            stompClient.send(`/pub/friends/${roomId}/chat`, {}, JSON.stringify(newMessage));
            setInputMessage("");
        }
    };

    return (
        <>
            <ChatRoomCreation />
            <div className="container">
                <ul>
                    {messages.map((message, index) => (
                        <li key={index}><strong>{message.sender} : {message.content}</strong></li>
                    ))}
                </ul>
            </div>
            <div className="sending">
                <input
                    type="text"
                    placeholder="메시지를 입력하세요."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                />
                <button onClick={handleSendMsg} className="send-btn">Send</button>
            </div>
        </>
    );
}
