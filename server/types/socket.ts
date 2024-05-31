// import { Socket } from "socket.io";

export interface UserSockets {
  [key: string]: {
    socketId: string;
    username?: string;
  };
}
