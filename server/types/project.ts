export interface Project {
  owner: string;
  projectName: string;
  projectId: string;
  joinedUsers: {
    socketId: string;
    username: string;
  }[];
  structure: ProjectStructure;
}

export interface UserProjects {
  [key: string]: Project;
}

export interface ProjectStructure {
  id: string;
  name: string;
  type: "folder";
  files?: File[];
  subFolders?: Folder[];
}

export interface Folder {
  id: string;
  name: string;
  type: "folder";
  files?: File[];
  subFolders?: Folder[];
}

export interface File {
  id: string;
  name: string;
  type: "file";
  content?: string;
}
