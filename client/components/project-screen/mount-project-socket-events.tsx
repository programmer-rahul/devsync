"use client";

import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { DEFAULT_PROJECT_STRUCTURE, SOCKET_ENUMS } from "@/lib/constants";
import useProjectSocketListeners from "@/lib/listeners/project-socket-listeners";

export default function MountProjectSocketEvents() {
  // zustand store states
  const {
    socket,
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

  // event listeners
  const {
    onInitialProjectDetails,
    onFileContentChanged,
    onNewMessageRecieve,
    onNewProjectItemCreated,
    onNewUserJoined,
    onProjectItemDeleted,
    onProjectItemRenamed,
    onUpdatedUserList,
    onUserLeaveProject,
  } = useProjectSocketListeners();

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
