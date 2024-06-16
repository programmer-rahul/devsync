import {
  File as FileInterface,
  Folder as FolderInterface,
} from "@/app/components/types/explorer";
import { useStore } from "@/components/store/useStore";
import { v4 as uuid } from "uuid";
import { SOCKET_ENUMS } from "@/lib/constants";
import {
  addItemToProject,
  deleteItemToProject,
  readItemContentToProject,
  renameItemToProject,
  updateFileContentToProject,
} from "@/lib/project-structure-utils";

export default function useProjectCrud() {
  // zustand store states
  const selectedFolderId = useStore((state) => state.selectedFolderId);
  const setSelectedFolderId = useStore((state) => state.setSelectedFolderId);

  const setSelectedFile = useStore((state) => state.setSelectedFile);
  const addEditorTab = useStore((state) => state.addEditorTab);
  const socket = useStore((state) => state.socket);

  const projectStructure = useStore((state) => state.projectStructure);
  const updateProjectStructure = useStore(
    (state) => state.updateProjectStructure,
  );

  const updateCreatingProjectItem = useStore(
    (state) => state.updateCreatingProjectItem,
  );

  const createProjectItem = ({
    itemId,
    itemType,
    itemName,
    folderId,
    toEmit = false,
  }: {
    itemType: "file" | "folder";
    itemName: string;
    folderId : string,
    itemId?: string;
    toEmit?: boolean;
  }) => {
    if (!itemId?.trim()) itemId = uuid();
    let response;

    let newFile: FileInterface = {
      id: itemId,
      name: itemName.trim(),
      type: "file",
      content: "",
    };
    let newFolder: FolderInterface = {
      id: itemId,
      name: itemName.trim(),
      type: "folder",
      files: [],
      subFolders: [],
    };

    response = addItemToProject(
      projectStructure,
      folderId,
      itemType,
      itemType === "file" ? newFile : newFolder,
    );

    if (response.status && toEmit) {
      // to select file if newly created for showing in tabs
      if (itemType === "file") {
        setSelectedFile(newFile);
        addEditorTab({
          name: newFile.name,
          id: newFile.id,
          content: "",
        });
      } else if (itemType === "folder") {
        setSelectedFolderId(newFolder.id);
      }

      // emit socket event for new items created
      socket?.emit(SOCKET_ENUMS.PROJECT_ITEM_CREATED, {
        newItem: itemType === "file" ? newFile : newFolder,
        folderId: folderId,
      });
    }
    updateProjectStructure(response.updatedProject);
    updateCreatingProjectItem(false, "file");
  };

  const deleteProjectItem = ({
    itemId,
    itemType,
    toEmit = false,
  }: {
    itemType: "file" | "folder";
    itemId?: string;
    toEmit?: boolean;
  }) => {
    if (!itemId?.trim()) return;
    let response;

    response = deleteItemToProject(projectStructure, itemId, itemType);

    if (response.status && toEmit) {
      // emit socket event for new items created
      socket?.emit(SOCKET_ENUMS.PROJECT_ITEM_DELETED, {
        itemId: itemId,
        itemType: itemType,
      });
    }
    updateProjectStructure(response.updatedProject);
  };

  const renameProjectItem = ({
    itemId,
    itemType,
    newName,
    toEmit = false,
  }: {
    itemId: string;
    itemType: "file" | "folder";
    newName: string;
    toEmit?: boolean;
  }) => {
    const { status, updatedProject } = renameItemToProject(
      projectStructure,
      itemId,
      itemType,
      newName,
    );

    if (status) {
      toEmit &&
        socket?.emit(SOCKET_ENUMS.PROJECT_ITEM_RENAMED, {
          itemType,
          itemId,
          newName,
        });
      updateProjectStructure(updatedProject);
    }
  };

  const updateFileContent = ({
    fileId,
    updatedContent,
    toEmit = false,
  }: {
    fileId: string;
    updatedContent: string;
    toEmit?: boolean;
  }) => {
    const { status, updatedProject } = updateFileContentToProject({
      project: projectStructure,
      fileId: fileId,
      updatedContent: updatedContent,
    });

    if (status) {
      toEmit &&
        socket?.emit(SOCKET_ENUMS.FILE_CONTENT_CHANGED, {
          fileId: fileId,
          updatedContent: updatedContent,
        });
      updateProjectStructure(updatedProject);
    }
  };

  const readFileContent = ({
    fileId,
  }: {
    fileId: string;
  }): { fileContent: string } => {
    let { status, fileContent } = readItemContentToProject({
      fileId: fileId,
      project: projectStructure,
    });

    if (!status) {
      fileContent = "";
    }

    return { fileContent };
  };

  return {
    createProjectItem,
    deleteProjectItem,
    renameProjectItem,
    readFileContent,
    updateFileContent,
  };
}
