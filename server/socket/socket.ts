import { DEFAULT_PROJECT_STRUCTURE, SOCKET_ENUMS } from "../utils/constants";
import { IoType, SocketType, UserSockets } from "../types/socket";
import { File, Project, UserProjects } from "../types/project";
import {
  addItemToProject,
  deleteItemToProject,
  renameItemToProject,
  updateFileContentToProject,
} from "../utils/project-structure-utils";

const { LOGIN, DISCONNECT } = SOCKET_ENUMS;

let userSockets: UserSockets = {};
let userProjects: UserProjects = {
  "ac251d95-3c54-410c-a148-546e01b18413": {
    owner: "dev",
    projectId: "ac251d95-3c54-410c-a148-546e01b18413",
    projectName: "project1",
    joinedUsers: [],
    structure: DEFAULT_PROJECT_STRUCTURE,
  },
};

const ioListener = (socket: SocketType, io: IoType) => {
  // login
  socket.on(LOGIN, () => onLogin(socket));

  // on disconnect
  socket.on(DISCONNECT, () => onDisconnect(socket));

  // for getting projects initial details
  socket.on(SOCKET_ENUMS.GET_INITIAL_PROJECTS_DETAILS, ({ projectIds }) =>
    onGetProjectInitialDetails({
      projectIds,
      socket,
    })
  );

  // on createProject
  socket.on(SOCKET_ENUMS.CREATE_PROJECT, (values) =>
    onCreateProject({ ...values, socket, io })
  );

  // on joinProject
  socket.on(SOCKET_ENUMS.JOIN_PROJECT, (values) =>
    onJoinProject({ ...values, socket, io })
  );
  // on leaveProject
  socket.on(SOCKET_ENUMS.LEAVE_PROJECT, () => onLeaveProject({ socket }));

  // to check is given projectId is valid or not
  socket.on(SOCKET_ENUMS.PROJECT_ID_VALIDATION, ({ projectId }) =>
    onProjectIdValidation({ projectId, socket })
  );

  // on a project deletion
  socket.on(SOCKET_ENUMS.DELETE_PROJECT, ({ projectId }) =>
    onProjectDelete({ projectId })
  );

  // project structure
  // on new project item creation
  socket.on(SOCKET_ENUMS.PROJECT_ITEM_CREATED, ({ newItem, folderId }) =>
    onProjectItemCreated({ socket, newItem, folderId })
  );
  socket.on(SOCKET_ENUMS.PROJECT_ITEM_CREATED, ({ newItem, folderId }) =>
    onProjectItemCreated({ socket, newItem, folderId })
  );
  // on a project item deletion
  socket.on(SOCKET_ENUMS.PROJECT_ITEM_DELETED, ({ itemId, itemType }) =>
    onProjectItemDeleted({ socket, itemId, itemType })
  );
  // on a project item renamed
  socket.on(
    SOCKET_ENUMS.PROJECT_ITEM_RENAMED,
    ({ itemId, itemType, newName }) =>
      onProjectItemRenamed({ socket, itemId, itemType, newName })
  );

  // on a file content changes in project
  socket.on(SOCKET_ENUMS.FILE_CONTENT_CHANGED, ({ fileId, updatedContent }) =>
    onFileContentChanged({ socket, updatedContent, fileId })
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

const onGetProjectInitialDetails = ({
  projectIds,
  socket,
}: {
  projectIds: { id: string; isCreated: boolean }[];
  socket: SocketType;
}) => {
  let initialProjects = projectIds.map((project) => {
    if (userProjects[project.id]) {
      const { owner, projectId, projectName } = userProjects[project.id];
      return { owner, projectId, projectName, isCreated: project.isCreated };
    }
  });
  initialProjects = initialProjects.filter((project) => project !== undefined);

  socket.emit(SOCKET_ENUMS.GET_INITIAL_PROJECTS_DETAILS, {
    initialProjects: initialProjects,
  });
};

const onCreateProject = ({
  projectId,
  projectName,
  owner,
  socket,
}: {
  projectId: string;
  projectName: string;
  owner: string;
  socket: SocketType;
}) => {
  if (!projectId?.trim() || !projectName?.trim() || !owner?.trim()) return;

  // create new project
  const newProject: Project = {
    owner: owner,
    projectId: projectId,
    projectName: projectName,
    joinedUsers: [],
    structure: DEFAULT_PROJECT_STRUCTURE,
  };

  // update userprojects object
  userProjects[projectId] = newProject;

  console.log(userProjects[projectId]);
  // socket.emit(SOCKET_ENUMS.CREATE_PROJECT, { status: true });
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
      structure: DEFAULT_PROJECT_STRUCTURE,
    };
  }

  const currentProject = userProjects[projectId];
  socket.join(projectId);

  // emit event to users to send notification about new user joined
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.JOIN_PROJECT, userSocket);

  // emit event to other users with updated users list
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, {
    updatedList: currentProject.joinedUsers,
  });

  // emit event to user with initialProjectDetails
  socket.emit(SOCKET_ENUMS.INITIAL_PROJECT_DETAILS, currentProject);
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
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.LEAVE_PROJECT, userSocket);
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, {
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

  socket.emit(SOCKET_ENUMS.PROJECT_ID_VALIDATION, {
    isProjectIdValid: isProjectAvailable,
  });
};

// structure
const onProjectItemCreated = ({
  socket,
  newItem,
  folderId,
}: {
  socket: SocketType;
  newItem: File;
  folderId: string;
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!newItem || !projectId) return;

  const structure = userProjects[projectId].structure;

  // add item in project structure
  const { updatedProject, status } = addItemToProject(
    structure,
    folderId,
    newItem.type,
    newItem
  );
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a new items created
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.PROJECT_ITEM_CREATED, {
    createdBy: currentUser,
    newItem,
    folderId,
  });
};

const onProjectItemDeleted = ({
  socket,
  itemId,
  itemType,
}: {
  socket: SocketType;
  itemId: string;
  itemType: "file" | "folder";
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!itemId || !itemType || !projectId) return;

  const structure = userProjects[projectId].structure;

  // delete item in project structure
  const { updatedProject, status } = deleteItemToProject(
    structure,
    itemId,
    itemType
  );
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a item deleted
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.PROJECT_ITEM_DELETED, {
    deletedBy: currentUser,
    itemId,
    itemType,
  });

  console.log(projectId);
};

const onProjectItemRenamed = ({
  socket,
  itemId,
  itemType,
  newName,
}: {
  socket: SocketType;
  itemId: string;
  itemType: "file" | "folder";
  newName: string;
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!itemId || !itemType || !newName || !projectId) return;

  const structure = userProjects[projectId].structure;

  // rename item in project structure
  const { updatedProject, status } = renameItemToProject(
    structure,
    itemId,
    itemType,
    newName
  );
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a item renamed
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.PROJECT_ITEM_RENAMED, {
    renamedBy: currentUser,
    itemId,
    itemType,
    newName,
  });

  console.log(projectId);
};

const onFileContentChanged = ({
  socket,
  fileId,
  updatedContent,
}: {
  socket: SocketType;
  fileId: string;
  updatedContent: string;
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!fileId || !updatedContent) return;
  if (!projectId) return;

  const structure = userProjects[projectId].structure;

  // update file content in project structure
  const { updatedProject, status } = updateFileContentToProject({
    project: structure,
    fileId: fileId,
    updatedContent: updatedContent,
  });
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a file content has been updated
  socket.broadcast.to(projectId).emit(SOCKET_ENUMS.FILE_CONTENT_CHANGED, {
    changedBy: currentUser,
    fileId: fileId,
    updatedContent: updatedContent,
  });
};

export { ioListener, userSockets };
