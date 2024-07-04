import { ProjectSlice } from "@/types/store/slice/project";
import { SetStateType } from "@/types/store/store";
import { DEFAULT_PROJECT_STRUCTURE } from "@/lib/constants";

export const createProjectSlice = (set: SetStateType): ProjectSlice => ({
  // userProjects
  userCreatedProjectsList: [],
  userJoinedProjectsList: [],

  addProjectinCreatedProjectsList: (newProject) =>
    set((state) => ({
      userCreatedProjectsList: [newProject, ...state.userCreatedProjectsList],
    })),
  addProjectinJoinedProjectsList: (newProject) =>
    set((state) => ({
      userJoinedProjectsList: [newProject, ...state.userJoinedProjectsList],
    })),

  removeProjectinCreatedProjectsList: (projectId) =>
    set((state) => ({
      userCreatedProjectsList: state.userCreatedProjectsList.filter(
        (projects) => projects.projectId !== projectId,
      ),
    })),
  removeProjectinJoinedProjectsList: (projectId) =>
    set((state) => ({
      userJoinedProjectsList: state.userJoinedProjectsList.filter(
        (projects) => projects.projectId !== projectId,
      ),
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
