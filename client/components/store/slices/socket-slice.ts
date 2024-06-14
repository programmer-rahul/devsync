import { SetStateType, SocketSlice } from "@/app/components/types/store";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export const createSocketSlice = (set: SetStateType): SocketSlice => ({
  socket: null,
  connectSocket: () =>
    set((state) => {
      const socket = io(SOCKET_SERVER_URL);

      return {
        socket: socket,
      };
    }),

  isConnectedToServer: false,
  updateIsConnectedToServer: (value) =>
    set((state) => ({ isConnectedToServer: value })),
});
