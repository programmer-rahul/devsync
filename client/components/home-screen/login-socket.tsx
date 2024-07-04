"use client";

import useSocket from "@/hooks/useSocket";
import { useEffect } from "react";

export default function LoginSocket() {
  // initialize socket connection to server
  const socket = useSocket();

  useEffect(() => {
    if (!socket) return;
  }, [socket]);

  return null;
}
