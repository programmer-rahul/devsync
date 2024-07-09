import { ProjectStructure } from "../types/project";

export const SOCKET_ENUMS = {
  LOGIN: "login",
  DISCONNECT: "disconnect",
  UPDATED_JOINED_USER_LIST: "updated-joined-users-list",

  // structure
  PROJECT_ITEM_CREATED: "project-item-created",
  PROJECT_ITEM_DELETED: "project-item-deleted",
  PROJECT_ITEM_RENAMED: "project-item-renamed",

  // file
  FILE_CONTENT_CHANGED: "file-content-changed",

  // project
  CREATE_PROJECT: "create-project",
  JOIN_PROJECT: "join-project",
  LEAVE_PROJECT: "leave-project",
  DELETE_PROJECT: "delete-project",
  PROJECT_ID_VALIDATION: "project_id-validation",
  INITIAL_PROJECT_DETAILS: "initial-project-details",
  UPDATED_PROJECT_STRUCTURE: "updated-project-structure",

  // chat
  SEND_MESSAGE: "send-message",
  RECIEVE_MESSAGE: "recieve-message",
};

export const DEFAULT_PROJECT_STRUCTURE: ProjectStructure = {
  id: ":root",
  name: "root",
  type: "folder",
  files: [],
  subFolders: [],
};
