"use client";

import useSocket from "@/hooks/useSocket";
import { SOCKET_ENUMS } from "@/lib/constants";
import { FileFolderCounts } from "@/types/project";
import { useEffect } from "react";
import { useStore } from "../store/useStore";

export default function LoginSocket() {
  // initialize socket connection to server
  const socket = useSocket();
  const { userCreatedProjectsList, updateCreatingProjectItem } = useStore(
    (state) => state
  );

  const onGetFolderAndFileCounts = ({
    folderFileCounts,
  }: {
    folderFileCounts: { projectId: string; counts: FileFolderCounts }[];
  }) => {
    console.log("got ", folderFileCounts);
  };

  useEffect(() => {
    if (!socket) return;

    if (socket) {
      socket.emit(SOCKET_ENUMS.GET_FOLDER_AND_FILE_COUNTS, {
        projectIds: userCreatedProjectsList.map((project) => project.projectId),
      });

      socket.on(
        SOCKET_ENUMS.GET_FOLDER_AND_FILE_COUNTS,
        onGetFolderAndFileCounts
      );
    }

    return () => {
      socket?.off(
        SOCKET_ENUMS.GET_FOLDER_AND_FILE_COUNTS,
        onGetFolderAndFileCounts
      );
    };
  }, [socket]);

  return null;
}
