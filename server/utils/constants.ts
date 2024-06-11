import { ProjectStructure } from "../types/project";

export const SOCKET_ENUMS = {
  CONNECT: "connect",
  LOGIN: "login",
  DISCONNECT: "disconnect",
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
};

export const DEFAULT_PROJECT_STRUCTURE: ProjectStructure = {
  id: ":root",
  name: "root",
  type: "folder",
  files: [
    {
      id: "index.ts",
      name: "index.ts",
      type: "file",
      content: `const filename = "index.ts"`,
    },
  ],
  subFolders: [
    {
      id: "components",
      name: "components",
      type: "folder",
      files: [
        {
          id: "components/index.ts",
          name: "index.ts",
          type: "file",
          content: `const filename = "components/index.ts"`,
        },
      ],
      subFolders: [],
    },
  ],
};
