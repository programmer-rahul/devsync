import { create } from "zustand";
import {Project} from '@/app/components/types/project'

type StoreStates = {
  showWelcomeScreen: boolean;
  setShowWelcomeScreen: (value: boolean) => void;

  createdProjects: Project[];
  addCreatedProjects: (Project: Project) => void;
};

export const useStore = create<StoreStates>((set) => ({
  showWelcomeScreen: false,
  setShowWelcomeScreen: (value) =>
    set(() => ({
      showWelcomeScreen: value,
    })),

  createdProjects: [],
  addCreatedProjects: (Project) =>
    set((state) => ({
      createdProjects: [...state.createdProjects, Project],
    })),
}));
