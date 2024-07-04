"use client";

import useSocket from "@/hooks/useSocket";
import { useEffect } from "react";
import { useStore } from "../store/useStore";
import { SOCKET_ENUMS } from "@/lib/constants";
import { Project as ProjectInterface } from "@/app/components/types/project";

export default function LoginSocket() {
  // initialize socket connection to server
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return null;
}
