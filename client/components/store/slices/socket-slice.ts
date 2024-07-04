import { SocketSlice } from "@/app/components/types/store/slice/socket";
import { SetStateType } from "@/app/components/types/store/store";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export const createSocketSlice = (set: SetStateType): SocketSlice => ({
  socket: null,
  connectSocket: () =>
    set(() => {
      const socket = io(SOCKET_SERVER_URL, {
        timeout: 10000,
        reconnectionAttempts: 3,
      });

      return {
        socket: socket,
      };
    }),

  isConnectedToServer: false,
  updateIsConnectedToServer: (value) =>
    set(() => ({ isConnectedToServer: value })),
});
