export type Project = {
  isCreated: boolean;
  owner: string;
  projectName: string;
  projectId: string;
  counts?: {
    connectedUsersCount: number;
    foldersCount: number;
    filesCount: number;
  };
};

export type ActivityBarButtons = "files" | "chats" | "users";
