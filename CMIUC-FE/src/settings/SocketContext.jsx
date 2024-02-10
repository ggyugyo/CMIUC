import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { createContext, useContext, useEffect, useState } from "react";
import { BACK_STOMP_URL, FRONT_STOMP_URL } from "../api/url/baseURL";

const SocketContext = createContext({ client: new Client() });

export const SocketProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken) return;

    const newClient = new Client({
      brokerURL: BACK_STOMP_URL,
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      // debug: (str) => console.log(str),
      beforeConnect: () => console.log("beforeConnect"),
      onConnect: () => console.log("onConnect"),
      onDisconnect: () => console.log("onDisconnect"),
      onWebSocketClose: (res) => console.log("onWebSocketClose", res),
      onWebSocketError: (err) => console.log("onWebSocketError", err),
      reconnectDelay: 5000,
      heartbeatIncoming: 0,
      heartbeatOutgoing: 0,
    });

    newClient.webSocketFactory = () => new SockJS(FRONT_STOMP_URL);

    setClient(newClient);
    newClient.activate();
  }, [accessToken]);

  return (
    <SocketContext.Provider value={{ client }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};
