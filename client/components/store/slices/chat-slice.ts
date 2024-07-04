import { ChatSlice } from "@/app/components/types/store/slice/chat";
import { SetStateType } from "@/app/components/types/store/store";

export const createChatSlice = (set: SetStateType): ChatSlice => ({
  // project chat
  projectChat: [],
  addMessageInProjectChat: (message) =>
    set((state) => ({
      projectChat: [...state.projectChat, message],
    })),

  clearChat: () =>
    set(() => ({
      projectChat: [],
    })),
});
