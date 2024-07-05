import { Socket } from "socket.io-client";

export type SocketSlice = {
  socket: Socket | null;
  connectSocket: () => void;
  isConnectedToServer: boolean;
  updateIsConnectedToServer: (value: boolean) => void;
};
