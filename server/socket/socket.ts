import { Server, Socket } from "socket.io";
import { SOCKET_ENUMS } from "../utils/constants";
import { UserSockets } from "../types/socket";
import { Project, UserProjects } from "../types/project";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let { LOGIN, DISCONNECT } = SOCKET_ENUMS;

let userSockets: UserSockets = {};
let userProjects: UserProjects = {};

const ioListener = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  // login
  socket.on(LOGIN, () => {
    userSockets[socket.id] = { socketId: socket.id };
    console.log("connection established", userSockets);
  });

  // on disconnect
  socket.on(DISCONNECT, () => {
    console.log("user disconnected");
  });

  socket.on(
    "join-project",
    ({
      username,
      projectId,
      projectName,
    }: {
      username: string;
      projectId: string;
      projectName: string;
    }) => {
      if (!username.trim() || !projectId.trim() || !projectName.trim()) return;

      // update userSockets
      let userSocket = { username: username, socketId: socket.id };
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
      socket.broadcast.to(projectId).emit("join-project", userSocket);

      // emit event to client with updated users list
      io.to(projectId).emit("updated-joined-users-list", {
        updatedList: userProjects[projectId].joinedUsers,
      });
    }
  );
};

export { ioListener, userSockets };
