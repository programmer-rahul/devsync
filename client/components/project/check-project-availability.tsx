"use client";

import { useEffect, useState } from "react";
import { SOCKET_ENUMS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { useStore } from "../store/useStore";
import ProjectPageLoading from "@/app/components/project/project-page-loading";
import ProjectPageIsNotAvailable from "@/app/components/project/project-page-not-available";
import ProjectPage from "@/app/components/project/project-page";
import { File, ProjectStructure } from "@/app/components/types/explorer";
import useProjectCrud from "@/hooks/useProjectCrud";

export default function CheckProjectAvailability() {
  // hooks
  const socket = useSocket();
  const pathname = usePathname();
  const { createProjectItem, deleteProjectItem } = useProjectCrud();

  // zustand store states
  const currentUsername = useStore((state) => state.currentUsername);
  const updateCurrentProjectName = useStore(
    (state) => state.updateCurrentProjectName,
  );
  const updateProjectClientsList = useStore(
    (state) => state.updateProjectClientsList,
  );
  const updateProjectStructure = useStore(
    (state) => state.updateProjectStructure,
  );
  const selectedFolderId = useStore((state) => state.selectedFolderId);
  const projectStructure = useStore((state) => state.projectStructure);

  // states
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectAvailable, setIsProjectAvailable] = useState(false);

  const projectId = pathname.split("/")[2];

  const onProjectIdValidation = ({
    isProjectIdValid,
  }: {
    isProjectIdValid: boolean;
  }) => {
    // update states to showing components
    setIsLoading(false);
    setIsProjectAvailable(isProjectIdValid);

    if (!isProjectIdValid) return;

    // emit join event to join user in project
    socket.emit(SOCKET_ENUMS.JOIN_PROJECT, {
      projectName: "",
      projectId: projectId,
      username: currentUsername,
    });
  };

  const onInitialProjectDetails = ({
    projectName,
    joinedUsers,
    structure,
  }: {
    projectName: string;
    joinedUsers: { socketId: string; username: string }[];
    structure: ProjectStructure;
  }) => {
    console.log("initial details", structure);

    if (projectName) updateCurrentProjectName(projectName);
    if (joinedUsers) updateProjectClientsList(joinedUsers);
    if (structure) updateProjectStructure(structure);
  };

  const onUpdatedUserList = ({
    updatedList,
  }: {
    updatedList: { username: string; socketId: string }[];
  }) => {
    console.log("updated list", updatedList);
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
  };

  const onUserLeaveProject = ({
    username,
    socketId,
  }: {
    username: string;
    socketId: string;
  }) => {
    console.log("A user disconnected", { username, socketId });
  };

  const onNewProjectItemCreated = ({
    createdBy,
    newItem,
    folderId,
  }: {
    createdBy: { username: string; socketId: string };
    newItem: File;
    folderId: string;
  }) => {
    createProjectItem({
      itemId: newItem.id,
      itemType: newItem.type,
      itemName: newItem.name,
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

  useEffect(() => {
    if (!socket) return;

    // to get that the current project is valid or not
    socket.on(SOCKET_ENUMS.PROJECT_ID_VALIDATION, onProjectIdValidation);

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

    return () => {
      if (!socket) return;
      socket.off(SOCKET_ENUMS.PROJECT_ID_VALIDATION, onProjectIdValidation);
      socket.off(SOCKET_ENUMS.INITIAL_PROJECT_DETAILS, onInitialProjectDetails);
      socket.off(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, onUpdatedUserList);
      socket.off(SOCKET_ENUMS.JOIN_PROJECT, onNewUserJoined);
      socket.off(SOCKET_ENUMS.LEAVE_PROJECT, onUserLeaveProject);

      socket.off(SOCKET_ENUMS.PROJECT_ITEM_CREATED, onNewProjectItemCreated);
      socket.off(SOCKET_ENUMS.PROJECT_ITEM_DELETED, onProjectItemDeleted);
    };
  }, [socket, projectStructure, selectedFolderId]);

  useEffect(() => {
    if (socket) {
      socket.emit(SOCKET_ENUMS.PROJECT_ID_VALIDATION, {
        projectId: projectId,
      });
    }
    return () => {
      setIsLoading(true);
      setIsProjectAvailable(false);
    };
  }, [socket]);

  return (
    <main className="flex h-screen border p-2">
      {isLoading ? (
        <ProjectPageLoading />
      ) : (
        !isProjectAvailable && <ProjectPageIsNotAvailable />
      )}

      {!isLoading && isProjectAvailable && <ProjectPage />}
    </main>
  );
}
