import { create } from "zustand";
import { Project } from "../types/project";

type StoreStates = {
  createdProjects: Project[];
  addCreatedProjects: (Project: Project) => void;
};

export const useStore = create<StoreStates>((set) => ({
  createdProjects: [],
  addCreatedProjects: (Project) =>
    set((state) => ({
      createdProjects: [...state.createdProjects, Project],
    })),
}));
