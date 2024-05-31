import { useStore } from "@/components/store/useStore";
import { SOCKET_ENUMS } from "@/lib/constants";
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

const useSocket = (): Socket => {
  const socket = useStore((state) => state.socket);
  const connectSocket = useStore((state) => state.connectSocket);
  const isConnectedToServer = useStore((state) => state.isConnectedToServer);
  const updateIsConnectedToServer = useStore(
    (state) => state.updateIsConnectedToServer,
  );

  useEffect(() => {
    if (!socket) {
      connectSocket();
    }
    if (socket && !isConnectedToServer) {
      updateIsConnectedToServer(true);

      socket.on(SOCKET_ENUMS.CONNECT, () => {
        console.log("successfully connected to server");
      });
      socket.emit(SOCKET_ENUMS.LOGIN);
    }
  }, [socket]);

  return socket as Socket;
};

export default useSocket;
