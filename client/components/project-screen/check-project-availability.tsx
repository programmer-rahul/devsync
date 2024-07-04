"use client";

import { ReactNode, useEffect, useState } from "react";
import { SOCKET_ENUMS } from "@/lib/constants";
import { usePathname } from "next/navigation";
import useSocket from "@/hooks/useSocket";
import { useStore } from "../store/useStore";

export default function CheckProjectAvailability({
  LoadingScreen,
  NotAvailableScreen,
  ProjectPage,
}: {
  LoadingScreen: ReactNode;
  NotAvailableScreen: ReactNode;
  ProjectPage: ReactNode;
}) {
  // hooks
  const socket = useSocket();
  const pathname = usePathname();

  // zustand store states
  const currentUsername = useStore((state) => state.currentUsername);

  // states
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectAvailable, setIsProjectAvailable] = useState(false);

  const projectId = pathname.split("/")[2];

  // check if the current projectid is valid or not
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

  useEffect(() => {
    if (!socket) return;

    // to emit project id validation event
    socket.emit(SOCKET_ENUMS.PROJECT_ID_VALIDATION, {
      projectId: projectId,
    });

    // listener for projectid validation
    socket.on(SOCKET_ENUMS.PROJECT_ID_VALIDATION, onProjectIdValidation);

    return () => {
      socket && socket.emit(SOCKET_ENUMS.LEAVE_PROJECT);
      socket &&
        socket.off(SOCKET_ENUMS.PROJECT_ID_VALIDATION, onProjectIdValidation);

      setIsLoading(true);
      setIsProjectAvailable(false);
    };
  }, [socket]);

  return (
    <div className="flex h-screen border p-2">
      {/* show loading and not available screen if project is not available  */}
      {isLoading ? LoadingScreen : !isProjectAvailable && NotAvailableScreen}

      {/* show projectpage if project is available  */}
      {!isLoading && isProjectAvailable && ProjectPage}
    </div>
  );
}
