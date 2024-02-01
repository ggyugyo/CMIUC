import SockJS from "sockjs-client";
import Stomp from "stompjs";

const socket = new SockJS("http://localhost:8080/ws-stomp");
const stompClient = Stomp.over(socket);

stompClient.connect(
  {},
  () => {
    console.log("Connection established");

    // Subscribe to a topic
    stompClient.subscribe("/sub/friends/chat/{}", (message) => {
      console.log("Received message:", message.body);
      // Handle the received message here
    });

    // Publish a message to a destination
    stompClient.send(
      "/app/sendMessage",
      {},
      JSON.stringify({ message: "Hello" })
    );
  },
  () => {
    console.log("Connection closed");
  }
);
