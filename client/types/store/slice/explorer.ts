import { File as FileInterface } from "../../explorer";
import { ActivityBarButtons } from "../../project";

export type ExplorerSlice = {
  selectedFile: FileInterface | null;
  setSelectedFile: (file: FileInterface | null) => void;

  selectedFolderId: string;
  setSelectedFolderId: (id: string) => void;

  currentActivityButton: ActivityBarButtons;
  setActivityButton: (value: ActivityBarButtons) => void;
};
