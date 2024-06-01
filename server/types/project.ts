export interface Project {
  owner: string;
  projectName: string;
  projectId: string;
  joinedUsers: {
    socketId: string;
    username: string;
  }[];
  structure: {};
}

export interface UserProjects {
  [key: string]: Project;
}
