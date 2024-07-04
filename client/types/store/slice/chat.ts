import { Message as MessageInterface } from "../../chat";

export type ChatSlice = {
  projectChat: MessageInterface[];
  addMessageInProjectChat: (message: MessageInterface) => void;
  clearChat: () => void;
};
