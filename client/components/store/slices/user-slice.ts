import { SetStateType, UserSlice } from "@/app/components/types/store";

export const createUserSlice = (set: SetStateType): UserSlice => ({
  showWelcomeScreen: true,
  setShowWelcomeScreen: (value) =>
    set(() => ({
      showWelcomeScreen: value,
    })),

  currentUsername: "",
  updatedCurrentUsername: (username) =>
    set(() => ({
      currentUsername: username,
    })),

  // project name
  currentProjectName: "",
  updateCurrentProjectName: (projectName) =>
    set(() => ({
      currentProjectName: projectName,
    })),

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
});
