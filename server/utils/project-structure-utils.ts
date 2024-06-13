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
  itemType: "file" | "folder"
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

const renameItemToProject = (
  project: ProjectStructure,
  itemId: string,
  itemType: "file" | "folder",
  newName: string
): AddItemResult => {
  const renameItem = (folder: FolderInterface): boolean => {
    if (itemType === "folder" && folder.id === itemId) {
      folder.name = newName;
      console.log("inside folder");
      return true;
    } else if (itemType === "file" && folder.files) {
      const isChanged = folder.files.some((file) => {
        if (file.id === itemId) {
          file.name = newName;
          console.log("inside file");
          return true;
        }
      });
      if (isChanged) return true;
    }

    if (!folder.subFolders) return false;
    for (const subFolder of folder.subFolders) {
      if (renameItem(subFolder)) {
        return true;
      }
    }
    return false;
  };

  const success = renameItem(project);

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
      error: `A  with the name "" already exists in the folder with ID "".`,
    };
  }
};

const updateFileContentToProject = ({
  project,
  fileId,
  updatedContent,
}: {
  project: ProjectStructure;
  fileId: string;
  updatedContent: string;
}) => {
  const updateContent = (folder: FolderInterface): boolean => {
    if (folder.files) {
      const isUpdated = folder.files.some((file) => {
        if (file.id === fileId) {
          file.content = updatedContent;
          return true;
        }
      });
      if (isUpdated) return true;
    }

    if (!folder.subFolders) return false;
    for (const subFolder of folder.subFolders) {
      if (updateContent(subFolder)) {
        return true;
      }
    }
    return false;
  };

  const success = updateContent(project);

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
      error: `A  with the name "" already exists in the folder with ID "".`,
    };
  }
};

const getFoldersAndFilesCount = (project: ProjectStructure) => {
  let filesCount = 0;
  let foldersCount = 0;

  const countFolderAndFiles = (folder: FolderInterface): boolean => {
    if (folder.id !== ":root") foldersCount++;

    if (folder.files) {
      filesCount += folder.files.length;
    }

    if (!folder.subFolders) return false;
    for (const subFolder of folder.subFolders) {
      if (countFolderAndFiles(subFolder)) {
        return true;
      }
    }
    return false;
  };

  const success = countFolderAndFiles(project);

  if (success) {
    return {
      count: { foldersCount, filesCount },
      status: true,
      error: null,
    };
  } else {
    return {
      count: { foldersCount, filesCount },
      status: false,
      error: `Error during calculating total numbers of folders and files`,
    };
  }
};

export {
  addItemToProject,
  deleteItemToProject,
  renameItemToProject,
  updateFileContentToProject,
  getFoldersAndFilesCount,
};
