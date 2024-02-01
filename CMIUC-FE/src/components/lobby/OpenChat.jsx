import SockJS from "sockjs-client";
import Stomp from "stompjs";

const socket = new SockJS("http://localhost:8080/ws-stomp");
const stompClient = Stomp.over(socket);

let messages = [];
const memberId = localStorage.getItem("id");

const connect = () => {
  stompClient.connect(
    { token: token, memberId: memberId, message: "" },
    () => {
      // Connection successful
      console.log("Connected to WebSocket");
    },
    (error) => {
      // Connection failed
      console.error("Failed to connect to WebSocket:", error);
    }
  );
};

const subscribe = (destination, callback) => {
  stompClient.subscribe(destination, (message) => {
    const messageBody = message.body;
    messages.push(messageBody);
    callback(messageBody);
  });
};

const send = (destination, body) => {
  stompClient.send(destination, {}, body);
};

export { connect, subscribe, send, messages };
