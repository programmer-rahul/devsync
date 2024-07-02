import { SetStateType, UserSlice } from "@/app/components/types/store";

export const createUserSlice = (set: SetStateType): UserSlice => ({
  showWelcomeScreen: false,
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
});
