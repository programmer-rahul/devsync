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
  const createSocketHandler = (eventName: string, handler: Function) => {
    socket.on(eventName, (...args: any[]) => {
      let allArguments = args.reduce((acc, obj) => {
        return { ...acc, ...obj };
      }, {});

      return handler({ socket, io, ...allArguments });
    });
  };

  // login
  createSocketHandler(LOGIN, onLogin);

  // on disconnect
  createSocketHandler(DISCONNECT, onDisconnect);

  // for getting projects initial details
  createSocketHandler(GET_INITIAL_PROJECTS_DETAILS, onGetProjectInitialDetails);

  // on createProject
  createSocketHandler(CREATE_PROJECT, onCreateProject);

  // on joinProject
  createSocketHandler(JOIN_PROJECT, onJoinProject);

  // on leaveProject
  createSocketHandler(LEAVE_PROJECT, onLeaveProject);

  // to check if given projectId is valid or not
  createSocketHandler(PROJECT_ID_VALIDATION, onProjectIdValidation);

  // on project deletion
  createSocketHandler(DELETE_PROJECT, onProjectDelete);

  // project structure
  // on new project item creation
  createSocketHandler(PROJECT_ITEM_CREATED, onProjectItemCreated);

  // on project item deletion
  createSocketHandler(PROJECT_ITEM_DELETED, onProjectItemDeleted);

  // on project item renamed
  createSocketHandler(PROJECT_ITEM_RENAMED, onProjectItemRenamed);

  // on file content changes in project
  createSocketHandler(FILE_CONTENT_CHANGED, onFileContentChanged);

  // chat
  createSocketHandler(SEND_MESSAGE, onNewMessageSend);
};

export { ioListener, userSockets, userProjects };
