import { StoreStates } from "@/app/components/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createProjectSlice } from "./slices/project-slice";
import { createExplorerSlice } from "./slices/explorer-slice";
import { createSocketSlice } from "./slices/socket-slice";
import { createUserSlice } from "./slices/user-slice";
import { createChatSlice } from "./slices/chat-slice";
import { createEditorSlice } from "./slices/editor-slice";

// store
export const useStore = create<StoreStates>()(
  persist(
    (set) => ({
      // projects
      ...createProjectSlice(set),
      // explorer
      ...createExplorerSlice(set),
      // socket
      ...createSocketSlice(set),
      // user
      ...createUserSlice(set),
      // editor
      ...createEditorSlice(set),
      // chat
      ...createChatSlice(set),
    }),
    {
      // to store values in localStorage
      name: "store-states",
      getStorage: () => localStorage,
      partialize: (state) => ({
        showWelcomeScreen: state.showWelcomeScreen,

        currentUsername: state.currentUsername,
        projectIds: state.projectIds,
      }),
    },
  ),
);
