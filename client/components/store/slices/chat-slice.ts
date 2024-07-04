import { ChatSlice, SetStateType } from "@/app/components/types/store/store";

export const createChatSlice = (set: SetStateType): ChatSlice => ({
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
