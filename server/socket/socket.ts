import { Socket } from "socket.io";
import { SOCKET_ENUMS } from "../utils/constants";
import { UserSockets } from "../types/socket";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let { LOGIN, DISCONNECT } = SOCKET_ENUMS;

let userSockets: UserSockets = {};

const ioListener = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  // login
  socket.on(LOGIN, () => {
    userSockets[socket.id] = socket.id;
    console.log("connection established", userSockets);
  });

  // on disconnect
  socket.on(DISCONNECT, () => {
    console.log("user disconnected");
  });
};

export { ioListener, userSockets };
