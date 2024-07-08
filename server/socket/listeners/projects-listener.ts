import { Project } from "../../types/project";
import { SocketType } from "../../types/socket";
import { DEFAULT_PROJECT_STRUCTURE, SOCKET_ENUMS } from "../../utils/constants";
import { getFoldersAndFilesCount } from "../../utils/project-structure-utils";
import { userProjects, userSockets } from "../socket";

const {
  GET_INITIAL_PROJECTS_DETAILS,
  PROJECT_ID_VALIDATION,
  UPDATED_JOINED_USER_LIST,
  JOIN_PROJECT,
  INITIAL_PROJECT_DETAILS,
  LEAVE_PROJECT,
} = SOCKET_ENUMS;

const onGetProjectInitialDetails = ({
  projectIds,
  socket,
}: {
  projectIds: { id: string; isCreated: boolean }[];
  socket: SocketType;
}) => {
  let initialProjects = projectIds.map((project) => {
    let currentProject = userProjects[project.id];
    if (currentProject) {
      const { owner, projectId, projectName, joinedUsers } = currentProject;

      const { count } = getFoldersAndFilesCount(currentProject.structure);

      console.log("count :", count);

      return {
        owner,
        projectId,
        projectName,
        isCreated: project.isCreated,
        counts: {
          ...count,
          connectedUsersCount: joinedUsers?.length,
        },
      };
    }
  });
  initialProjects = initialProjects.filter((project) => project !== undefined);

  socket.emit(GET_INITIAL_PROJECTS_DETAILS, {
    initialProjects: initialProjects,
  });
};

const onCreateProject = ({
  projectId,
  projectName,
  owner,
}: {
  projectId: string;
  projectName: string;
  owner: string;
}) => {
  if (!projectId?.trim() || !projectName?.trim() || !owner?.trim()) return;

  // create new project
  const newProject: Project = {
    owner: owner,
    projectId: projectId,
    projectName: projectName,
    joinedUsers: [],
    structure: JSON.parse(JSON.stringify(DEFAULT_PROJECT_STRUCTURE)),
  };

  // update userprojects object
  userProjects[projectId] = newProject;
};

const onJoinProject = ({
  username,
  projectId,
  projectName,
  socket,
}: {
  username: string;
  projectId: string;
  projectName?: string;
  socket: SocketType;
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
      structure: JSON.parse(JSON.stringify(DEFAULT_PROJECT_STRUCTURE)),
    };
  }

  const currentProject = userProjects[projectId];
  socket.join(projectId);

  // emit event to users to send notification about new user joined
  socket.broadcast.to(projectId).emit(JOIN_PROJECT, userSocket);

  // emit event to other users with updated users list
  socket.broadcast.to(projectId).emit(UPDATED_JOINED_USER_LIST, {
    updatedList: currentProject.joinedUsers,
  });

  // emit event to user with initialProjectDetails
  socket.emit(INITIAL_PROJECT_DETAILS, currentProject);
};

const onLeaveProject = ({ socket }: { socket: SocketType }) => {
  const userSocket = userSockets[socket.id];
  const projectId = userSocket?.joinedProject;
  if (!projectId) return;

  // remove user from socket and project
  delete userSockets[socket.id].joinedProject;

  const updatedJoinedUsers = userProjects[projectId].joinedUsers.filter(
    (user) => user.socketId !== userSocket.socketId
  );
  userProjects[projectId].joinedUsers = updatedJoinedUsers;

  // emit event
  socket.broadcast.to(projectId).emit(LEAVE_PROJECT, userSocket);
  socket.broadcast.to(projectId).emit(UPDATED_JOINED_USER_LIST, {
    updatedList: updatedJoinedUsers,
  });
};

const onProjectDelete = ({ projectId }: { projectId: string }) => {
  if (!projectId?.trim()) return;
  delete userProjects[projectId];
};

const onProjectIdValidation = ({
  projectId,
  socket,
}: {
  projectId: string;
  socket: SocketType;
}) => {
  if (!projectId?.trim()) return;

  const isProjectAvailable = userProjects[projectId] ? true : false;

  socket.emit(PROJECT_ID_VALIDATION, {
    isProjectIdValid: isProjectAvailable,
  });
};

export {
  onCreateProject,
  onGetProjectInitialDetails,
  onJoinProject,
  onLeaveProject,
  onProjectDelete,
  onProjectIdValidation,
};
