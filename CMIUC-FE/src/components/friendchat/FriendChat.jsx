import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./FriendChat.css";
import axios from "axios";
import { useParams } from "react-router-dom";


let stompClient;
export default function FriendChat() {

    // const {roomId} = useParams();

    // 임시 하드코딩
    const roomId = "100";
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const connect = () => {
        console.log("연결할라고요");
        const sockJS = new SockJS("http://localhost:8080/ws-stomp");
        stompClient = Stomp.over(sockJS);

        stompClient.connect({"token" : token}, onConnected, failToConnect);
    }

    const onConnected = () => {
        console.log("채팅방과 첫 연결 실행하는 로직")
        stompClient.subscribe("/sub/friends/chat/" + roomId, (msg) => {
            console.log("축하합니다. 연결됐습니다.");
            console.log("!!!!token은요!!!!" + token)
            // stompClient.send("/pub/friends/chat/" + roomId, {}, JSON.stringify({content: "님아 어서 오세요", roomId: roomId}))   

        })
    }

    const failToConnect = () => {
        console.log("ERROR가 났어욜");
    }

    // 메세지를 보내보자
    const sendMessage = () => {
        const chatMessage = {
            memberId: 95110101010,
            sender: "개로왕",
            message : inputMessage
        }

        setMessages((prevMessages) => [...prevMessages, chatMessage]);
        
        stompClient.send("/pub/friends/chat/" + roomId, {"token" : token}, JSON.stringify(chatMessage));

        setInputMessage("");
    }

    // 메시지를 받아보자
    const receivedMessage = (payload) => {

        const chat = JSON.parse(payload.body);
        console.log("들어온 메시지: " + chat.message);

        const messageDTO = {
            sender: chat.sender,
            message: chat.message
        }

        setMessages((prevMessages) => [...prevMessages, messageDTO]);
    }


    // 처음 접속 시에만 실행
    useEffect(() => {
        connect();

        return () => stompClient.disconnect(() => {
            alert("담에 또 채팅하러 오세요.")
        })

    }, [])

    return(
        
            <>
                
                <div className="container">
                    <ul id="talk">
                        {messages.map((msg, index) => (
                            <li key={index}>{msg.message}</li>
                        ))}
                    </ul>
                </div>
                <div className="sending">
                    <input
                        type="text"
                        placeholder="메시지를 입력하세요."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if(e.key === "Enter") {
                                sendMessage()
                            }
                        }}
                    />
                    <button onClick={sendMessage} className="send-btn">Send</button>
                </div>
            </>
    );
}