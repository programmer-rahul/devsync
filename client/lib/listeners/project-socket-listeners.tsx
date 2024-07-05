import { useStore } from "@/components/store/useStore";
import useProjectCrud from "@/hooks/useProjectCrud";
import { File as FileInterface, ProjectStructure } from "@/types/explorer";
import { Message as MessageInterface } from "@/types/chat";
import { toast } from "react-toastify";

export default function useProjectSocketListeners() {
  const {
    createProjectItem,
    deleteProjectItem,
    renameProjectItem,
    updateFileContent,
  } = useProjectCrud();

  // zustand store states
  const {
    selectedFile,
    addMessageInProjectChat,
    setSelectedFile,
    updateCurrentProjectName,
    updateProjectClientsList,
    updateProjectStructure,
  } = useStore((state) => state);

  const onInitialProjectDetails = ({
    projectName,
    joinedUsers,
    structure,
  }: {
    projectName: string;
    joinedUsers: { socketId: string; username: string }[];
    structure: ProjectStructure;
  } & {}) => {
    if (projectName) updateCurrentProjectName(projectName);
    if (joinedUsers) updateProjectClientsList(joinedUsers);
    if (structure) updateProjectStructure(structure);
  };

  const onUpdatedUserList = ({
    updatedList,
  }: {
    updatedList: { username: string; socketId: string }[];
  }) => {
    if (!updatedList) return;

    updateProjectClientsList(updatedList);
  };

  const onNewUserJoined = ({
    username,
    // socketId,
  }: {
    username: string;
    socketId: string;
  }) => {
    toast.dark(`User ${username} joined`);
  };

  const onUserLeaveProject = ({
    username,
    // socketId,
  }: {
    username: string;
    socketId: string;
  }) => {
    toast.dark(`User ${username} disconnected`);
  };

  const onNewProjectItemCreated = ({
    newItem,
    folderId,
  }: {
    createdBy: { username: string; socketId: string };
    newItem: FileInterface;
    folderId: string;
  }) => {
    createProjectItem({
      itemId: newItem.id,
      itemType: newItem.type,
      itemName: newItem.name,
      folderId: folderId,
      toEmit: false,
    });
  };

  const onProjectItemDeleted = ({
    deletedBy,
    itemId,
    itemType,
  }: {
    deletedBy: { username: string; socketId: string };
    itemId: string;
    itemType: "file" | "folder";
  }) => {
    if (!deletedBy || !itemId || !itemType) return;

    deleteProjectItem({ itemId: itemId, itemType: itemType });
  };

  const onProjectItemRenamed = ({
    renamedBy,
    itemId,
    itemType,
    newName,
  }: {
    renamedBy: { username: string; socketId: string };
    itemId: string;
    itemType: "file" | "folder";
    newName: string;
  }) => {
    if (!renamedBy || !itemId || !itemType || !newName) return;

    renameProjectItem({ itemId: itemId, itemType: itemType, newName: newName });
  };

  const onFileContentChanged = ({
    changedBy,
    fileId,
    updatedContent,
  }: {
    changedBy: { username: string; socketId: string };
    fileId: string;
    updatedContent: string;
  }) => {
    if (!changedBy || !fileId || !updatedContent) return;

    updateFileContent({ fileId: fileId, updatedContent: updatedContent });

    if (selectedFile?.id === fileId) {
      setSelectedFile({ ...selectedFile });
    }
  };

  const onNewMessageRecieve = (newMessage: MessageInterface) => {
    addMessageInProjectChat(newMessage);
  };

  return {
    onInitialProjectDetails,
    onUpdatedUserList,
    onNewUserJoined,
    onUserLeaveProject,
    onNewProjectItemCreated,
    onProjectItemDeleted,
    onFileContentChanged,
    onProjectItemRenamed,
    onNewMessageRecieve,
  };
}
