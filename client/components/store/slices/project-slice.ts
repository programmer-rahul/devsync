import { SetStateType, ProjectSlice } from "@/app/components/types/store";

export const createProjectSlice = (set: SetStateType): ProjectSlice => ({
  projectIds: [],
  addProjectId: (newProjectId) =>
    set((state) => ({
      projectIds: [...state.projectIds, newProjectId],
    })),
  removeProjectId: ({ id }) =>
    set((state) => {
      return {
        projectIds: state.projectIds.filter((projectId) => projectId.id !== id),
      };
    }),

  initialProjects: [],
  addProjectinProjects: (newProject) =>
    set((state) => ({
      initialProjects: [...state.initialProjects, newProject],
    })),
  removeProjectInProjects: ({ projectId }) =>
    set((state) => {
      return {
        initialProjects: state.initialProjects.filter(
          (project) => project.projectId !== projectId,
        ),
      };
    }),

  updateInitialProjects: (updatedProjects) =>
    set(() => ({
      initialProjects: updatedProjects,
    })),

  currentActivityButton: "files",
  setActivityButton: (value) =>
    set((state) => ({
      currentActivityButton: value,
    })),

  projectClientsList: [],
  updateProjectClientsList: (updatedList) =>
    set(() => ({
      projectClientsList: updatedList,
    })),
});
