import { useStore } from "@/components/store/useStore";
import { SOCKET_ENUMS } from "@/lib/constants";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const useSocket = (): Socket => {
  const socket = useStore((state) => state.socket);
  const connectSocket = useStore((state) => state.connectSocket);
  const isConnectedToServer = useStore((state) => state.isConnectedToServer);
  const updateIsConnectedToServer = useStore(
    (state) => state.updateIsConnectedToServer,
  );

  const onSocketConnect = () => {
    console.log("successfully connected to server");
  };

  const onLogin = () => {
    console.log("Login successfully");
  };

  useEffect(() => {
    if (!socket) {
      connectSocket();
    }
    if (socket && !isConnectedToServer) {
      updateIsConnectedToServer(true);
      socket.emit(SOCKET_ENUMS.LOGIN);

      socket.on(SOCKET_ENUMS.CONNECT, onSocketConnect);
      socket.on(SOCKET_ENUMS.LOGIN, onLogin);
    }
  }, [socket]);

  return socket as Socket;
};

export default useSocket;
