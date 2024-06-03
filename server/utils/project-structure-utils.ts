import {
  ProjectStructure,
  File as FileInterface,
  Folder as FolderInterface,
} from "../types/project";

type AddItemResult = {
  updatedProject: ProjectStructure;
  status: boolean;
  error: null | string;
};

const addItemToProject = (
  project: ProjectStructure,
  targetFolderId: string,
  itemType: "file" | "folder",
  newItem: FileInterface | FolderInterface
): AddItemResult => {
  const addItem = (folder: FolderInterface): boolean => {
    if (folder.id === targetFolderId) {
      if (itemType === "file" && folder.files) {
        if (folder.files.some((file) => file.name === newItem.name)) {
          return false;
        }
        folder.files.push(newItem as FileInterface);
      } else if (itemType === "folder" && folder.subFolders) {
        if (
          folder.subFolders.some((subFolder) => subFolder.name === newItem.name)
        ) {
          return false;
        }
        folder.subFolders.push(newItem as FolderInterface);
      }
      return true;
    }
    if (!folder.subFolders) return false;
    for (const subFolder of folder.subFolders) {
      if (addItem(subFolder)) {
        return true;
      }
    }
    return false;
  };

  const success = addItem(project);

  if (success) {
    return {
      updatedProject: project,
      status: true,
      error: null,
    };
  } else {
    return {
      updatedProject: project,
      status: false,
      error: `A ${itemType} with the name "${newItem.name}" already exists in the folder with ID "${targetFolderId}".`,
    };
  }
};

const deleteItemToProject = (
  project: ProjectStructure,
  itemId: string,
  itemType: "file" | "folder",
): AddItemResult => {
  const deleteItem = (folder: FolderInterface): boolean => {
    if (itemType === "file" && folder.files) {
      const index = folder.files.findIndex((file) => file.id === itemId);
      if (index !== -1) {
        folder.files.splice(index, 1);
        return true;
      }
    } else if (itemType === "folder" && folder.subFolders) {
      const index = folder.subFolders.findIndex(
        (subFolder) => subFolder.id === itemId
      );
      if (index !== -1) {
        folder.subFolders.splice(index, 1);
        return true;
      }
    }


    
    if (!folder.subFolders) return false;
    for (const subFolder of folder.subFolders) {
      if (deleteItem(subFolder)) {
        return true;
      }
    }
    return false;
  };

  const success = deleteItem(project);

  if (success) {
    return {
      updatedProject: project,
      status: true,
      error: null,
    };
  } else {
    return {
      updatedProject: project,
      status: false,
      error: `No ${itemType} found with ID "${itemId}".`,
    };
  }
};

export { addItemToProject ,deleteItemToProject};
