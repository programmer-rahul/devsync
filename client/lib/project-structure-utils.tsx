import {
  File as FileInterface,
  Folder as FolderInterface,
  ProjectStructure,
} from "@/app/components/types/explorer";

type AddItemResult = {
  updatedProject: ProjectStructure;
  status: boolean;
  error: null | string;
};

const addItemToProject = (
  project: ProjectStructure,
  targetFolderId: string,
  itemType: "file" | "folder",
  newItem: FileInterface | FolderInterface,
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

export { addItemToProject };
