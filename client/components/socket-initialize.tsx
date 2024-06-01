"use client";

import useSocket from "@/hooks/useSocket";
import { SOCKET_ENUMS } from "@/lib/constants";
import { useEffect } from "react";

export default function SocketInitialize() {
  const socket = useSocket();

  const onUpdatedUserList = ({
    updatedList,
  }: {
    updatedList: { username: string; socketId: string }[];
  }) => {
    console.log("updated list", updatedList);
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

  useEffect(() => {
    if (!socket) return;

    socket.on(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, onUpdatedUserList);
    socket.on(SOCKET_ENUMS.JOIN_PROJECT, onNewUserJoined);

    return () => {
      socket.off(SOCKET_ENUMS.UPDATED_JOINED_USER_LIST, onUpdatedUserList);
      socket.off(SOCKET_ENUMS.JOIN_PROJECT, onNewUserJoined);
    };
  }, [socket]);

  return <></>;
}
