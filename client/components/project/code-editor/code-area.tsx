"use client";

import { useStore } from "@/components/store/useStore";
import { useEffect } from "react";

export default function CodeArea() {
  const selectedFile = useStore((state) => state.selectedFile);

  const socket = useStore((state) => state.socket);
  const connectSocket = useStore((state) => state.connectSocket);

  useEffect(() => {
    console.log("socket", socket);

    if (!socket) {
      connectSocket();
    }
    if (socket) {
      console.log("connected to the server!!");
      
    }
  }, [socket]);

  return (
    <div className="flex-1 border">
      <p>{selectedFile?.content}</p>
    </div>
  );
}
