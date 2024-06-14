import { Socket } from "socket.io-client";
import { ProjectStructure } from "./explorer";
import { Message as MessageInterface } from "@/app/components/types/chat";
import {
  ActivityBarButtons,
  Project as ProjectInterface,
} from "@/app/components/types/project";
import { File as FileInterface } from "./explorer";

export type StoreStates = EditorSlice &
  SocketSlice &
  ExplorerSlice &
  ChatSlice &
  UserSlice &
  ProjectSlice;

export type EditorSlice = {
  // code editor
  openedEditorTabs: { name: string; id: string; content: string }[];
  removeEditorTab: (id: string) => { name: string; id: string }[];
  addEditorTab: ({
    name,
    id,
    content,
  }: {
    name: string;
    id: string;
    content: string;
  }) => void;
};

export type SocketSlice = {
  // socket
  socket: Socket | null;
  connectSocket: () => void;
  isConnectedToServer: boolean;
  updateIsConnectedToServer: (value: boolean) => void;
};

export type ExplorerSlice = {
  selectedFile: FileInterface | null;
  setSelectedFile: (file: FileInterface) => void;

  selectedFolderId: string;
  setSelectedFolderId: (id: string) => void;

  projectStructure: ProjectStructure;
  updateProjectStructure: (updatedProjectStructure: ProjectStructure) => void;

  creatingProjectItem: { status: boolean; type: "file" | "folder" };
  updateCreatingProjectItem: (status: boolean, type: "file" | "folder") => void;
};

export type UserSlice = {
  showWelcomeScreen: boolean;
  setShowWelcomeScreen: (value: boolean) => void;
  currentUsername: string;
  updatedCurrentUsername: (username: string) => void;
  currentProjectName: string;
  updateCurrentProjectName: (projectName: string) => void;
};

export type ProjectSlice = {
  projectIds: { id: string; isCreated: boolean }[];
  addProjectId: ({ id, isCreated }: { id: string; isCreated: boolean }) => void;
  removeProjectId: ({ id }: { id: string }) => void;

  initialProjects: ProjectInterface[];
  addProjectinProjects: (newProject: ProjectInterface) => void;
  removeProjectInProjects: ({ projectId }: { projectId: string }) => void;
  updateInitialProjects: (updateProjects: ProjectInterface[]) => void;

  currentActivityButton: ActivityBarButtons;
  setActivityButton: (value: ActivityBarButtons) => void;

  projectClientsList: { username: string; socketId: string }[];
  updateProjectClientsList: (
    updatedList: { username: string; socketId: string }[],
  ) => void;
};

export type ChatSlice = {
  projectChat: MessageInterface[];
  addMessageInProjectChat: (message: MessageInterface) => void;
};

export type SetStateType = (
  partial:
    | StoreStates
    | Partial<StoreStates>
    | ((state: StoreStates) => StoreStates | Partial<StoreStates>),
  replace?: boolean | undefined,
) => void;
