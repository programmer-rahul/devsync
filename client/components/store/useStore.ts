import { create } from "zustand";
import { ActivityBarButtons, Project } from "@/app/components/types/project";
import { LocalStorage } from "@/lib/helper";
import { File, ProjectStructure } from "@/app/components/types/explorer";
import { DEFAULT_PROJECT_STRUCTURE } from "@/lib/constants";

type StoreStates = {
  showWelcomeScreen: boolean;
  setShowWelcomeScreen: (value: boolean) => void;

  createdProjects: Project[];
  addCreatedProjects: (Project: Project) => void;

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
  openedEditorTabs: { name: string; id: string }[];
  removeEditorTab: (id: string) => { name: string; id: string }[];
  addEditorTab: ({ name, id }: { name: string; id: string }) => void;
};

export const useStore = create<StoreStates>((set) => ({
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
      updatedEditorTabs = state.openedEditorTabs.filter((tab) => tab.id !== id);

      return {
        openedEditorTabs: updatedEditorTabs,
      };
    });

    return updatedEditorTabs!;
  },

  addEditorTab: ({ name, id }) => {
    set((state) => {
      let isAvailable = state.openedEditorTabs.some((tab) => tab.id === id);

      return {
        openedEditorTabs: isAvailable
          ? state.openedEditorTabs
          : [{ name, id }, ...state.openedEditorTabs.slice(0, 4)],
      };
    });
  },
}));
