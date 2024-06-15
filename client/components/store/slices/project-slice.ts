import { SetStateType, ProjectSlice } from "@/app/components/types/store";
import { DEFAULT_PROJECT_STRUCTURE } from "@/lib/constants";

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

  projectClientsList: [],
  updateProjectClientsList: (updatedList) =>
    set(() => ({
      projectClientsList: updatedList,
    })),
});
