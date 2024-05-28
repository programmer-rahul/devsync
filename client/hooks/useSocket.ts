import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

const useSocket = (): Socket => {
  let [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    socket = io(SOCKET_SERVER_URL);
    setSocket(socket);

    return () => {
      // Disconnect the socket when component unmounts
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return socket as Socket;
};

export default useSocket;
