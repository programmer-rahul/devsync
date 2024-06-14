import { SetStateType, ExplorerSlice } from "@/app/components/types/store";
import { DEFAULT_PROJECT_STRUCTURE } from "@/lib/constants";

export const createExplorerSlice = (set: SetStateType): ExplorerSlice => ({
  selectedFile: null,
  setSelectedFile: (file) =>
    set((state) => ({
      selectedFile: file,
    })),

  selectedFolderId: ":root",
  setSelectedFolderId: (id) =>
    set((state) => ({
      selectedFolderId: id,
    })),

  projectStructure: DEFAULT_PROJECT_STRUCTURE,
  updateProjectStructure: (updatedProjectStructure) =>
    set(() => ({
      projectStructure: { ...updatedProjectStructure },
    })),

  creatingProjectItem: { status: false, type: "file" },
  updateCreatingProjectItem: (status, type) =>
    set(() => ({
      creatingProjectItem: { status, type },
    })),
});
