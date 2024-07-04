import { UserSlice } from "@/types/store/slice/user";
import { SetStateType } from "@/types/store/store";

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
});
