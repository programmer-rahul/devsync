"use client";

import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { DEFAULT_PROJECT_STRUCTURE, SOCKET_ENUMS } from "@/lib/constants";
import { ProjectStructure } from "@/app/components/types/explorer";
import { toast } from "react-toastify";
import useProjectCrud from "@/hooks/useProjectCrud";
import { Message as MessageInterface } from "@/app/components/types/chat";
import { File as FileInterface } from "@/app/components/types/explorer";

export default function MountProjectSocketEvents() {
  const {
    createProjectItem,
    deleteProjectItem,
    renameProjectItem,
    updateFileContent,
  } = useProjectCrud();

  // zustand store states
  const {
    socket,
    selectedFile,
    addMessageInProjectChat,
    selectedFolderId,
    setSelectedFile,
    projectStructure,
    setSelectedFolderId,
    setActivityButton,
    updateCurrentProjectName,
    updateProjectClientsList,
    updateProjectStructure,
    clearChat,
  } = useStore((state) => state);

  //   event listeners
  const onInitialProjectDetails = ({
    projectName,
    joinedUsers,
    structure,
  }: {
    projectName: string;
    joinedUsers: { socketId: string; username: string }[];
    structure: ProjectStructure;
  }) => {
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
    socketId,
  }: {
    username: string;
    socketId: string;
  }) => {
    console.log("A new User Joined", { username, socketId });
    toast.dark(`User ${username} joined`);
  };

  const onUserLeaveProject = ({
    username,
    socketId,
  }: {
    username: string;
    socketId: string;
  }) => {
    console.log("A user disconnected", { username, socketId });
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

  useEffect(() => {
    if (!socket) return;

    // to get initial project details
    socket.on(SOCKET_ENUMS.INITIAL_PROJECT_DETAILS, onInitialProjectDetails);

    // to get new updated joinded users list
    socket.on(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, onUpdatedUserList);

    // on other user connects or disconnects
    socket.on(SOCKET_ENUMS.JOIN_PROJECT, onNewUserJoined);
    socket.on(SOCKET_ENUMS.LEAVE_PROJECT, onUserLeaveProject);

    // project structure listeners
    socket.on(SOCKET_ENUMS.PROJECT_ITEM_CREATED, onNewProjectItemCreated);
    socket.on(SOCKET_ENUMS.PROJECT_ITEM_DELETED, onProjectItemDeleted);
    socket.on(SOCKET_ENUMS.PROJECT_ITEM_RENAMED, onProjectItemRenamed);

    socket.on(SOCKET_ENUMS.FILE_CONTENT_CHANGED, onFileContentChanged);

    // chat
    socket.on(SOCKET_ENUMS.RECIEVE_MESSAGE, onNewMessageRecieve);

    return () => {
      if (!socket) return;
      socket.off(SOCKET_ENUMS.INITIAL_PROJECT_DETAILS, onInitialProjectDetails);
      socket.off(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, onUpdatedUserList);
      socket.off(SOCKET_ENUMS.JOIN_PROJECT, onNewUserJoined);
      socket.off(SOCKET_ENUMS.LEAVE_PROJECT, onUserLeaveProject);

      socket.off(SOCKET_ENUMS.PROJECT_ITEM_CREATED, onNewProjectItemCreated);
      socket.off(SOCKET_ENUMS.PROJECT_ITEM_DELETED, onProjectItemDeleted);
      socket.off(SOCKET_ENUMS.PROJECT_ITEM_RENAMED, onProjectItemRenamed);

      socket.off(SOCKET_ENUMS.FILE_CONTENT_CHANGED, onFileContentChanged);

      socket.off(SOCKET_ENUMS.RECIEVE_MESSAGE, onNewMessageRecieve);
    };
  }, [socket, projectStructure, selectedFolderId]);

  //   for states reseting
  useEffect(() => {
    return () => {
      setSelectedFile(null);
      setSelectedFolderId(":root");
      setActivityButton("files");
      updateCurrentProjectName("");
      updateProjectClientsList([]);
      updateProjectStructure(DEFAULT_PROJECT_STRUCTURE);
      clearChat();
    };
  }, []);

  return null;
}
