import { userProjects, userSockets } from "../socket";
import { SOCKET_ENUMS } from "../../utils/constants";
import { SocketType } from "../../types/socket";

const { LOGIN, LEAVE_PROJECT, UPDATED_JOINED_USER_LIST } = SOCKET_ENUMS;

const onLogin = ({ socket }: { socket: SocketType }) => {
  userSockets[socket.id] = { socketId: socket.id };
  socket.emit(LOGIN);
  console.log("A new user connected successfully!✨", socket.id);
};

const onDisconnect = ({ socket }: { socket: SocketType }) => {
  console.log("user disconnected", socket.id);

  // check and remove user from userSockets
  const isAvailable = userSockets[socket.id];
  if (!isAvailable) return;

  delete userSockets[socket.id];

  // check if user joined any project
  const isProjectJoined = isAvailable.joinedProject;
  if (!isProjectJoined) return;

  userProjects[isProjectJoined].joinedUsers = userProjects[
    isProjectJoined
  ].joinedUsers.filter((user) => user.socketId !== socket.id);

  // emit events
  socket.broadcast.to(isProjectJoined).emit(LEAVE_PROJECT, isAvailable);
  socket.broadcast.to(isProjectJoined).emit(UPDATED_JOINED_USER_LIST, {
    updatedList: userProjects[isProjectJoined].joinedUsers,
  });

  socket.leave(isProjectJoined);
};

export { onLogin, onDisconnect };
