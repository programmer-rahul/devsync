import { ExplorerSlice } from "@/types/store/slice/explorer";
import { SetStateType } from "@/types/store/store";

export const createExplorerSlice = (set: SetStateType): ExplorerSlice => ({
  selectedFile: null,
  setSelectedFile: (file) =>
    set(() => ({
      selectedFile: file,
    })),

  selectedFolderId: ":root",
  setSelectedFolderId: (id) =>
    set(() => ({
      selectedFolderId: id,
    })),

  currentActivityButton: "files",
  setActivityButton: (value) =>
    set(() => ({
      currentActivityButton: value,
    })),
});
