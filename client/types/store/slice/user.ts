export type UserSlice = {
    showWelcomeScreen: boolean;
    setShowWelcomeScreen: (value: boolean) => void;
    currentUsername: string;
    updatedCurrentUsername: (username: string) => void;
    currentProjectName: string;
    updateCurrentProjectName: (projectName: string) => void;
  };
  