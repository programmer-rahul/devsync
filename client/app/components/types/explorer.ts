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
