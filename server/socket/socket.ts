import { SOCKET_ENUMS } from "../utils/constants";
import { IoType, SocketType, UserSockets } from "../types/socket";
import { UserProjects } from "../types/project";
import { onDisconnect, onLogin } from "./listeners/users-listener";
import { onNewMessageSend } from "./listeners/chat-listener";
import { onFileContentChanged } from "./listeners/files-listener";
import {
  onProjectItemCreated,
  onProjectItemDeleted,
  onProjectItemRenamed,
} from "./listeners/project-structures-listener";
import {
  onGetProjectInitialDetails,
  onCreateProject,
  onJoinProject,
  onLeaveProject,
  onProjectIdValidation,
  onProjectDelete,
} from "./listeners/projects-listener";

const {
  LOGIN,
  DISCONNECT,
  FILE_CONTENT_CHANGED,
  GET_INITIAL_PROJECTS_DETAILS,
  CREATE_PROJECT,
  DELETE_PROJECT,
  JOIN_PROJECT,
  LEAVE_PROJECT,
  PROJECT_ITEM_CREATED,
  PROJECT_ITEM_DELETED,
  PROJECT_ID_VALIDATION,
  PROJECT_ITEM_RENAMED,
  SEND_MESSAGE,
} = SOCKET_ENUMS;

let userSockets: UserSockets = {};
let userProjects: UserProjects = {};

const ioListener = (socket: SocketType, io: IoType) => {
  // login
  socket.on(LOGIN, () => onLogin(socket));

  // on disconnect
  socket.on(DISCONNECT, () => onDisconnect(socket));

  // for getting projects initial details
  socket.on(GET_INITIAL_PROJECTS_DETAILS, ({ projectIds }) =>
    onGetProjectInitialDetails({
      projectIds,
      socket,
    })
  );

  // on createProject
  socket.on(CREATE_PROJECT, (values) =>
    onCreateProject({ ...values, socket, io })
  );

  // on joinProject
  socket.on(JOIN_PROJECT, (values) => onJoinProject({ ...values, socket, io }));
  // on leaveProject
  socket.on(LEAVE_PROJECT, () => onLeaveProject({ socket }));

  // to check is given projectId is valid or not
  socket.on(PROJECT_ID_VALIDATION, ({ projectId }) =>
    onProjectIdValidation({ projectId, socket })
  );

  // on a project deletion
  socket.on(DELETE_PROJECT, ({ projectId }) => onProjectDelete({ projectId }));

  // project structure
  // on new project item creation
  socket.on(PROJECT_ITEM_CREATED, ({ newItem, folderId }) =>
    onProjectItemCreated({ socket, newItem, folderId })
  );
  socket.on(PROJECT_ITEM_CREATED, ({ newItem, folderId }) =>
    onProjectItemCreated({ socket, newItem, folderId })
  );
  // on a project item deletion
  socket.on(PROJECT_ITEM_DELETED, ({ itemId, itemType }) =>
    onProjectItemDeleted({ socket, itemId, itemType })
  );
  // on a project item renamed
  socket.on(PROJECT_ITEM_RENAMED, ({ itemId, itemType, newName }) =>
    onProjectItemRenamed({ socket, itemId, itemType, newName })
  );

  // on a file content changes in project
  socket.on(FILE_CONTENT_CHANGED, ({ fileId, updatedContent }) =>
    onFileContentChanged({ socket, updatedContent, fileId })
  );

  // chat
  socket.on(SEND_MESSAGE, ({ message }) =>
    onNewMessageSend({ message, socket })
  );
};

export { ioListener, userSockets, userProjects };
