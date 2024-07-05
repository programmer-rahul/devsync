import { EditorSlice } from "./slice/editor";
import { SocketSlice } from "./slice/socket";
import { ExplorerSlice } from "./slice/explorer";
import { UserSlice } from "./slice/user";
import { ChatSlice } from "./slice/chat";
import { ProjectSlice } from "./slice/project";

export type StoreStates = EditorSlice &
  SocketSlice &
  ExplorerSlice &
  ChatSlice &
  UserSlice &
  ProjectSlice;

export type SetStateType = (
  partial:
    | StoreStates
    | Partial<StoreStates>
    | ((state: StoreStates) => StoreStates | Partial<StoreStates>),
  replace?: boolean | undefined,
) => void;
