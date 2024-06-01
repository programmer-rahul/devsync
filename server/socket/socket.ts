import { SOCKET_ENUMS } from "../utils/constants";
import { IoType, SocketType, UserSockets } from "../types/socket";
import { UserProjects } from "../types/project";

const { LOGIN, DISCONNECT } = SOCKET_ENUMS;

let userSockets: UserSockets = {};
let userProjects: UserProjects = {
  "ac251d95-3c54-410c-a148-546e01b18413": {
    owner: "",
    projectId: "ac251d95-3c54-410c-a148-546e01b18413",
    projectName: "dummy",
    structure: {},
    joinedUsers: [],
  },
};

const ioListener = (socket: SocketType, io: IoType) => {
  // login
  socket.on(LOGIN, () => onLogin(socket));

  // on disconnect
  socket.on(DISCONNECT, () => onDisconnect(socket));

  // on joinProject
  socket.on(SOCKET_ENUMS.JOIN_PROJECT, (values) =>
    onJoinProject({ ...values, socket, io })
  );

  // to check is given projectId is valid or not
  socket.on(SOCKET_ENUMS.PROJECT_ID_VALIDATION, ({ projectId }) =>
    onProjectIdValidation({ projectId, socket })
  );
};

const onLogin = (socket: SocketType) => {
  userSockets[socket.id] = { socketId: socket.id };
  console.log("connection established", userSockets);
  socket.emit(SOCKET_ENUMS.LOGIN);
};

const onDisconnect = (socket: SocketType) => {
  console.log("user disconnected");

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
  socket.broadcast
    .to(isProjectJoined)
    .emit(SOCKET_ENUMS.LEAVE_PROJECT, isAvailable);
  socket.broadcast
    .to(isProjectJoined)
    .emit(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, {
      updatedList: userProjects[isProjectJoined].joinedUsers,
    });

  socket.leave(isProjectJoined);

  console.log("isAvailable", isAvailable);
  console.log("userProjects", userProjects);
};

const onJoinProject = ({
  username,
  projectId,
  projectName,
  socket,
  io,
}: {
  username: string;
  projectId: string;
  projectName?: string;
  socket: SocketType;
  io: IoType;
}) => {
  // check upcoming user fields
  if (!username?.trim() || !projectId?.trim()) return;
  if (!projectName) projectName = "";

  // update userSockets
  let userSocket = {
    username: username,
    socketId: socket.id,
    joinedProject: projectId,
  };
  userSockets[socket.id] = userSocket;

  // check if project is already available
  const isProjectAvailable = userProjects[projectId] ? true : false;
  if (isProjectAvailable) {
    userProjects[projectId].joinedUsers.push(userSocket);
  } else {
    // if not available then create new one
    userProjects[projectId] = {
      owner: username,
      projectName: projectName,
      projectId: projectId,
      joinedUsers: [userSocket],
      structure: {},
    };
  }

  // emit event to client to send notification about new user joined
  socket.join(projectId);
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.JOIN_PROJECT, userSocket);

  // emit event to client with updated users list
  io.to(projectId).emit(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, {
    updatedList: userProjects[projectId].joinedUsers,
  });

  console.log("user joined into project", userProjects);
};

const onProjectIdValidation = ({
  projectId,
  socket,
}: {
  projectId: string;
  socket: SocketType;
}) => {
  if (!projectId.trim()) return;

  const isProjectAvailable = userProjects[projectId] ? true : false;

  console.log(projectId);
  console.log(isProjectAvailable);

  const isUserJoined = userProjects[projectId].joinedUsers.some(
    (user) => user.socketId === socket.id
  );

  socket.emit(SOCKET_ENUMS.PROJECT_ID_VALIDATION, {
    isValid: isProjectAvailable,
    isUserJoined: isUserJoined,
  });
};

export { ioListener, userSockets };
