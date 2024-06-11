export type Project = {
  isCreated: boolean;
  owner: string;
  projectName: string;
  projectId: string;
  connectedUsersCount?: number;
};

export type ActivityBarButtons = "files" | "chats" | "users";
