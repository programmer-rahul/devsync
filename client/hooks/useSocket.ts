import { useStore } from "@/components/store/useStore";
import { SOCKET_ENUMS } from "@/lib/constants";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const useSocket = (): Socket => {
  // store states
  const {
    socket,
    connectSocket,
    isConnectedToServer,
    updateIsConnectedToServer,
  } = useStore((state) => state);

  // on connect listener funciton
  const onSocketConnect = () => {
    console.log("🚀 Successfully connected to server");
    updateIsConnectedToServer(true);
  };

  useEffect(() => {
    if (!socket) connectSocket();

    if (socket && !isConnectedToServer) {
      // emit login event
      socket.emit(SOCKET_ENUMS.LOGIN);

      // listening for success socket connection with server
      socket.on(SOCKET_ENUMS.CONNECT, onSocketConnect);
    }
  }, [socket]);

  return socket as Socket;
};

export default useSocket;
