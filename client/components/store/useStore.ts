import { create } from "zustand";
import { ActivityBarButtons, Project } from "@/app/components/types/project";
import { LocalStorage } from "@/lib/helper";
import { File } from "@/app/components/types/explorer";

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
}));
