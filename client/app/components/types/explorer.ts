export type ProjectStructure = {
  id: string;
  name: string;
  type: "folder";
  files?: Files[];
  subFolders?: Folder[];
};

export type Folder = {
  id: string;
  name: string;
  type: "folder";
  files?: Files[];
  subFolders?: Folder[];
};

export interface Files {
  id: string;
  name: string;
  type: "file";
  content?: string;
}
