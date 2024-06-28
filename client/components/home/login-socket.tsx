"use client";

import useSocket from "@/hooks/useSocket";
import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { SOCKET_ENUMS } from "@/lib/constants";
import { Project as ProjectInterface } from "@/app/components/types/project";

export default function LoginSocket() {
  const socket = useSocket();

  const { projectIds, updateInitialProjects } = useStore((state) => state);

  const onGetInitialProjectDetails = ({
    initialProjects,
  }: {
    initialProjects: ProjectInterface[];
  }) => {
    updateInitialProjects(initialProjects);
  };

  useEffect(() => {
    if (!socket) return;

    socket.emit(SOCKET_ENUMS.GET_INITIAL_PROJECTS_DETAILS, {
      projectIds: projectIds,
    });

    socket.on(
      SOCKET_ENUMS.GET_INITIAL_PROJECTS_DETAILS,
      onGetInitialProjectDetails,
    );

    return () => {
      if (!socket) return;
      socket.off(
        SOCKET_ENUMS.GET_INITIAL_PROJECTS_DETAILS,
        onGetInitialProjectDetails,
      );
    };
  }, [socket]);

  return null;
}
