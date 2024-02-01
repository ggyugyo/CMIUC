import { useState, useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import "./FriendChat.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChatRoomCreation from "./ChatRoomCreation";

export default function FriendChat() {

    // 백에서 전달하는 거겠지? 우선 useState로 해둠
    // const {roomId} = useParams();
    const roomId = "1234";
    const [stompClient, setStompClient] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [token, setToken] = useState("");

    const [userData, setUserData] = useState({
        data : {
            sender: "",
            message: ""
        }
    });

    const stompClientRef = useRef(null);


    const failToConnect = () => {
        console.log("ERROR가 났어욜");                   
    }


    useEffect(() => {
        axios.get("http://localhost:8080/chat/user")
        .then((res) => {
            setToken(res.data.token);
        })
        .catch(failToConnect);
    }, []);         // 초기 렌더링 시에만 효과 발생 . setToken의 비동기적 작동을 방지하기 위함.

    useEffect(() => {
        if(token && !stompClient) {
            const socket = new SockJS("http://localhost:8080/ws-stomp");
            const stomp = Stomp.over(socket);
            setStompClient(stomp);

            stomp.connect({ "token": token }, () => {
                console.log("connected; roomId : " + roomId);
                stomp.subscribe("/sub/friends/chat/room/" + roomId, (msg) => {
                    console.log("축하합니다. 연결이 됐습니다." + msg.body)
                    const receivedMessage = JSON.parse(msg.body);
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                    
                });
            }, failToConnect);
            

            // 컴포넌트가 언마운트될 때 소켓 연결 정리
            return () => {
                if (stompClientRef.current) {
                    stompClientRef.current.disconnect()
                }
                
            }
        }
    }, [token, roomId])

   
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSendMsg();
        }
    };

    const handleSendMsg = () => {
        if (stompClient && inputMessage.trim() !== ""){
            const newMessage = {
                sender: "아무개씨",
                content: inputMessage
            }

            userData.data = newMessage;

            // 메시지 전송
            stompClient.send(`/pub/friends/${roomId}/chat`, {}, JSON.stringify(userData.data));
            setInputMessage("");
            console.log("찍히나요??" + userData);



            // 보낸 메시지가 화면에 나오도록 ul 태그 선택 및 li 태그 생성 
            const ul = document.querySelector("#talk");
            const li = document.createElement("li");

            // li 태그 스타일링
            li.style.backgroundColor = "#f2f2f2";  
            li.style.color = "#333";               
            li.style.padding = "8px";  
            li.style.marginBottom = "10px";
            li.style.border = "1px solid lightblue";
            li.style.borderRadius = "5px";

            // li 태그에 inner 값 넣어주기 및 ul 밑으로 넣기
            li.innerHTML = newMessage.content;
            ul.appendChild(li);
            
        }
    };

    return(
        
            <>
                
                <ChatRoomCreation />
                <div className="container">
                    <ul id="talk">
                        
                    </ul>
                </div>
                <div className="sending">
                    <input 
                        type="text"
                        placeholder="메시지를 입력하세요."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSendMsg} className="send-btn">Send</button>
                </div>
            </>
    );
}