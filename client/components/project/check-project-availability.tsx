"use client";

import { useEffect, useState } from "react";
import { SOCKET_ENUMS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { useStore } from "../store/useStore";
import ProjectPageLoading from "@/app/components/project/project-page-loading";
import ProjectPageIsNotAvailable from "@/app/components/project/project-page-not-available";
import ProjectPage from "@/app/components/project/project-page";
import { ProjectStructure } from "@/app/components/types/explorer";

export default function CheckProjectAvailability() {
  const socket = useSocket();
  const pathname = usePathname();

  const currentUsername = useStore((state) => state.currentUsername);
  const updateProjectClientsList = useStore(
    (state) => state.updateProjectClientsList,
  );
  const updateProjectStructure = useStore(
    (state) => state.updateProjectStructure,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isProjectAvailable, setIsProjectAvailable] = useState(false);
  const projectId = pathname.split("/")[2];

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

  const onCheckProjectAvailabilty = ({
    isValid,
    isUserJoined,
  }: {
    isValid: boolean;
    isUserJoined: boolean;
  }) => {
    console.log("got result from server");
    setIsLoading(false);
    setIsProjectAvailable(isValid);

    console.log("isUserJoined: " + isUserJoined);

    isValid && !isUserJoined
      ? socket.emit(SOCKET_ENUMS.JOIN_PROJECT, {
          projectId: projectId,
          projectName: "",
          username: currentUsername,
        })
      : socket.emit(SOCKET_ENUMS.UPDATED_PROJECT_STRUCTURE, {
          projectId: projectId,
        });
  };

  const onUpdatedProjectStructure = ({
    updatedProjectStructure,
  }: {
    updatedProjectStructure: ProjectStructure;
  }) => {
    console.log("onUpdatedProjectStructure", updatedProjectStructure);

    if (!updatedProjectStructure) return;
    updateProjectStructure(updatedProjectStructure);
  };

  useEffect(() => {
    console.log("useEffect rendered");
    if (!socket) return;

    socket.emit(SOCKET_ENUMS.PROJECT_ID_VALIDATION, {
      projectId: projectId,
    });

    socket.on(SOCKET_ENUMS.PROJECT_ID_VALIDATION, onCheckProjectAvailabilty);
    socket.on(SOCKET_ENUMS.JOIN_PROJECT, onNewUserJoined);
    socket.on(SOCKET_ENUMS.LEAVE_PROJECT, onUserLeaveProject);
    socket.on(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, onUpdatedUserList);
    socket.on(
      SOCKET_ENUMS.UPDATED_PROJECT_STRUCTURE,
      onUpdatedProjectStructure,
    );

    return () => {
      if (!socket) return;
      socket.off(SOCKET_ENUMS.PROJECT_ID_VALIDATION, onCheckProjectAvailabilty);
      socket.off(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, onUpdatedUserList);
      socket.off(SOCKET_ENUMS.JOIN_PROJECT, onNewUserJoined);
      socket.off(SOCKET_ENUMS.LEAVE_PROJECT, onUserLeaveProject);

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
