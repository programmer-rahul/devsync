import { SocketType } from "../../types/socket";
import { SOCKET_ENUMS } from "../../utils/constants";
import { userSockets } from "../socket";

const { RECIEVE_MESSAGE } = SOCKET_ENUMS;

const onNewMessageSend = ({
  message,
  socket,
}: {
  message: string;
  socket: SocketType;
}) => {
  if (!message.trim()) return;

  const userSocket = userSockets[socket.id];
  const projectId = userSocket?.joinedProject;
  const username = userSocket?.username;

  if (!projectId) return;

  socket.broadcast.to(projectId).emit(RECIEVE_MESSAGE, {
    message: message,
    sender: username,
    createdAt: new Date(),
  });
};

export { onNewMessageSend };
