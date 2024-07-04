import { SetStateType, ExplorerSlice } from "@/app/components/types/store/store";

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
