export type FileFolderCounts = {
  connectedUsersCount: number;
  foldersCount: number;
  filesCount: number;
};

export type Project = {
  owner: string;
  projectName: string;
  projectId: string;
  counts?: FileFolderCounts;
};

export type ActivityBarButtons = "files" | "chats" | "users" | "settings";
