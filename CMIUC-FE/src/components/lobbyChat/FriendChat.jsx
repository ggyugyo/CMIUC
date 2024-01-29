import { useState, useEffect } from "react";
import SockJS from "socketjs-client";
import Stomp from "stompjs";
import "./FriendChat.css";

export default function FriendChat() {

    
    const [userData, setUserData] = useState({
        username: "",
        connected: false,
        message: ""
    });

    const [stompClient, setStompClient] = useState(null);
    // 상대방에게 받는 메시지 - 배열 안에 객체 형태로 {username, content}
    const [messages, setMessages] = useState([]);
    // 내가 보내는 메시지
    const [inputMessage, setInputMessage] = useState("");

    useEffect(() => {
        const socket = new SockJS("http://localhost:8080/ws");
        const stomp  = Stomp.over(socket);
        stomp.connect({}, () => {
            setStompClient(stomp);
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const handleSendMsg = () => {
        if (stompClient && inputMessage.trim() !== ""){
            const newMessage = {
                username: userData.username,
                content: inputMessage
            }
            stompClient.send("/app/friends/:roomId/chat", {}, JSON.stringify({ username: userData.username, content: inputMessage}));
            setInputMessage("");
        }
    };

    useEffect(() => {
        if (stompClient) {
            stompClient.subscribe("/sub/friends/chat/room/:roomId", (res) => {
                const newMessage = JSON.parse(res.body);
                setMessages((precMessages) => [...precMessages, newMessage]);
            });
        }
    }, [stompClient]);


    return(
        
            <>
                <div className="container">
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index}><strong>{message.username} : {message.content}</strong></li>
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