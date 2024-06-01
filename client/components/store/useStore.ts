import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ActivityBarButtons, Project } from "@/app/components/types/project";
import { LocalStorage } from "@/lib/helper";
import { File, ProjectStructure } from "@/app/components/types/explorer";
import { DEFAULT_PROJECT_STRUCTURE } from "@/lib/constants";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

type StoreStates = {
  showWelcomeScreen: boolean;
  setShowWelcomeScreen: (value: boolean) => void;

  createdProjects: Project[];
  addCreatedProjects: (Project: Project) => void;

  joinedProjects: Project[];
  addJoinedProjects: (Project: Project) => void;

  // project
  currentActivityButton: ActivityBarButtons;
  setActivityButton: (value: ActivityBarButtons) => void;

  //explorer
  selectedFile: File | null;
  setSelectedFile: (file: File) => void;

  selectedFolderId: string;
  setSelectedFolderId: (id: string) => void;

  projectStructure: ProjectStructure;
  updateProjectStructure: (updatedProjectStructure: ProjectStructure) => void;

  creatingProjectItem: { status: boolean; type: "file" | "folder" };
  updateCreatingProjectItem: (status: boolean, type: "file" | "folder") => void;

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

  // socket
  socket: Socket | null;
  connectSocket: () => void;
  isConnectedToServer: boolean;
  updateIsConnectedToServer: (value: boolean) => void;

  // username
  currentUsername: string;
  updatedCurrentUsername: (username: string) => void;

  // clients
  projectClientsList: { username: string; socketId: string }[];
  updateProjectClientsList: (
    updatedList: { username: string; socketId: string }[],
  ) => void;
};

// store
export const useStore = create<StoreStates>()(
  persist(
    (set) => ({
      showWelcomeScreen: false,
      setShowWelcomeScreen: (value) =>
        set(() => ({
          showWelcomeScreen: value,
        })),

      createdProjects: LocalStorage.get("createdProjects") || [],
      addCreatedProjects: (Project) =>
        set((state) => ({
          createdProjects: [...state.createdProjects, Project],
        })),

      joinedProjects: LocalStorage.get("joinedProjects") || [],
      addJoinedProjects: (Project) =>
        set((state) => ({
          createdProjects: [...state.createdProjects, Project],
        })),

      // projects
      currentActivityButton: "files",
      setActivityButton: (value) =>
        set((state) => ({
          currentActivityButton: value,
        })),

      // explorer
      selectedFile: null,
      setSelectedFile: (file) =>
        set((state) => ({
          selectedFile: file,
        })),

      selectedFolderId: ":root",
      setSelectedFolderId: (id) =>
        set((state) => ({
          selectedFolderId: id,
        })),

      projectStructure: DEFAULT_PROJECT_STRUCTURE,
      updateProjectStructure: (updatedProjectStructure) =>
        set(() => ({
          projectStructure: { ...updatedProjectStructure },
        })),

      creatingProjectItem: { status: false, type: "file" },
      updateCreatingProjectItem: (status, type) =>
        set(() => ({
          creatingProjectItem: { status, type },
        })),

      // code editor
      openedEditorTabs: [],
      removeEditorTab: (id) => {
        let updatedEditorTabs;

        set((state) => {
          updatedEditorTabs = state.openedEditorTabs.filter(
            (tab) => tab.id !== id,
          );

          return {
            openedEditorTabs: updatedEditorTabs,
          };
        });

        return updatedEditorTabs!;
      },

      addEditorTab: ({ name, id, content }) => {
        set((state) => {
          let isAvailable = state.openedEditorTabs.some((tab) => tab.id === id);

          return {
            openedEditorTabs: isAvailable
              ? state.openedEditorTabs
              : [{ name, id, content }, ...state.openedEditorTabs.slice(0, 4)],
          };
        });
      },

      // socket
      socket: null,
      connectSocket: () =>
        set((state) => {
          const socket = io(SOCKET_SERVER_URL);

          return {
            socket: socket,
          };
        }),

      isConnectedToServer: false,
      updateIsConnectedToServer: (value) =>
        set((state) => ({ isConnectedToServer: value })),

      // username
      currentUsername: "dfd",
      updatedCurrentUsername: (username) =>
        set(() => ({
          currentUsername: username,
        })),

      // clients
      projectClientsList: [],
      updateProjectClientsList: (updatedList) =>
        set(() => ({
          projectClientsList: updatedList,
        })),
    }),
    {
      name: "store",
      getStorage: () => localStorage,
      partialize: (state) => ({
        currentUsername: state.currentUsername,
      }),
    },
  ),
);
