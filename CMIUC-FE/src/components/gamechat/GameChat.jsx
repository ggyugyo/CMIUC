import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const ChatComponent = () => {
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const currentUser = "me"; 


  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // 더 불러올 메시지가 있는지 여부
  const observer = useRef();
  const lastMessageRef = useRef(); // 마지막 메시지를 참조하는 ref

  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    //spring 포트번호 8080
    const sockJS = new SockJS('http://localhost:9001/echo');
    const stompClient = Stomp.over(sockJS);


    stompClient.connect({}, () => {
      // 올바른 토픽 주소로 구독 설정
      stompClient.subscribe('/topic/messages', (payload) => {
        const newMessage = JSON.parse(payload.body);
        setMessages(messages => [...messages, newMessage]);
      });
    });

    setStompClient(stompClient);

    
    sockJS.onmessage = (event) => {
        // Stomp 프레임에서 본문을 추출합니다.
        const messageIndex = event.data.indexOf('\n\n');
        const body = event.data.substring(messageIndex + 2).trim();
        const jsonBody = body.replace(/\0$/, ''); // 메시지 끝의 null 문자 제거
      
        try {
          const parsedMessage = JSON.parse(jsonBody);
          console.log('Parsed message:', parsedMessage);
          // 전체 메시지 객체를 상태 배열에 추가합니다.
          setMessages(messages => [...messages, parsedMessage.chatMessage]);
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };
      

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, []);

  // 마지막 메시지가 보이면 추가 메시지를 불러오는 로직
  const lastMessageCallback = (entries) => {
    if (entries[0].isIntersecting && hasMore && !loading) {
      // 여기에 메시지를 불러오는 로직을 추가합니다.
      // 예: 서버로부터 이전 메시지를 불러오는 API 호출
      setLoading(true);
      // 예: setMessages([...새로운 메시지, ...messages]);
      // setLoading(false);
      // setHasMore(서버에 더 많은 메시지가 있는지 여부);
    }
  };

  useEffect(() => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(lastMessageCallback);
    if (lastMessageRef.current) observer.current.observe(lastMessageRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore]); // loading 또는 hasMore 상태가 변경될 때마다 observer를 재설정합니다.



  const sendMessage = () => {
    if (stompClient && message.trim()) {
        const chatMessage = { message, sender: currentUser };
        stompClient.send("/app/send", {}, JSON.stringify({ chatMessage }));
        setMessages(messages => [...messages, chatMessage]);
        setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-200" style={{ maxHeight: '30vh', maxWidth: '400px' }}>
      <div className="flex-grow overflow-y-auto p-3 space-y-2">
        {messages.map((msg, index) => {
          const myMessage = "bg-blue-500 text-white p-2 rounded-l-lg rounded-t-lg";
          const otherMessage = "bg-gray-300 text-black p-2 rounded-r-lg rounded-t-lg";
          return (
            <div
              key={index}
              className={`my-2 ${msg.sender === 'me' ? myMessage : otherMessage}`}
            >
              {msg.sender === 'me' ? '나: ' : '상대방: '}{msg.message}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {loading && <div>Loading more messages...</div>}
      <div className="flex items-center p-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          className="flex-grow p-2 rounded-l-lg border border-gray-400"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-r-lg">Send</button>
      </div>
    </div>
  );
}


export default ChatComponent;
