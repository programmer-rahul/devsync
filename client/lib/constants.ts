import { ProjectStructure } from "@/app/components/types/explorer";

export const SOCKET_ENUMS = {
  CONNECT: "connect",
  LOGIN: "login",
  JOIN_PROJECT: "join-project",
  LEAVE_PROJECT: "leave-project",
  UPDATED_JOINED_USER_LIST: "updated-joined-users-list",
  PROJECT_ID_VALIDATION: "project_id-validation",
  UPDATED_PROJECT_STRUCTURE: "updated-project-structure",
  INITIAL_PROJECT_DETAILS: "initial-project-details",

  // structure
  PROJECT_ITEM_CREATED: "project-item-created",
  PROJECT_ITEM_DELETED: "project-item-deleted",
  PROJECT_ITEM_RENAMED: "project-item-renamed",

  FILE_CONTENT_CHANGED: "file-content-changed",

  // project
  CREATE_PROJECT: "create-project",

  GET_INITIAL_PROJECTS_DETAILS: "get-initial-projects-details",
  DELETE_PROJECT: "delete-project",

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

export const FILE_ICONS: { [key: string]: string } = {
  html: "/files/languages/html.svg",
  css: "/files/languages/css.svg",
  java: "/files/languages/java.svg",
  js: "/files/languages/javascript.svg",
  json: "/files/languages/json.svg",
  md: "/files/languages/markdown.svg",
  py: "/files/languages/python.svg",
  txt: "/files/languages/txt.svg",
  ts: "/files/languages/typescript.svg",
};
