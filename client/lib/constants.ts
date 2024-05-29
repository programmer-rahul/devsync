import { ProjectStructure } from "@/app/components/types/explorer";

export const SOCKET_ENUMS = {
  CONNECT: "connect",
  LOGIN: "login",
};

export const DEFAULT_PROJECT_STRUCTURE: ProjectStructure = {
  id: ":root",
  name: "root",
  type: "folder",
  files: [
    {
      id: "file1",
      name: "index.ts",
      type: "file",
      content: "",
    },
  ],
  subFolders: [],
};
