"use client";

import ChatMessages from "@/components/project-screen/sidebar-panel/chats-panel/chat-messages";
import NewMessageInput from "@/components/project-screen/sidebar-panel/chats-panel/new-message-input";
import NoChatItemsImage from "@/components/project-screen/sidebar-panel/chats-panel/no-chat-items-image";
import { useStore } from "@/components/store/useStore";

import { useEffect, useRef } from "react";

export default function ChatPanel() {
  // scroll ref to scroll at bottom messages
  const scrollZoomRef = useRef<HTMLDivElement>(null);

  const { projectChat } = useStore((state) => state);

  useEffect(() => {
    if (scrollZoomRef.current)
      scrollZoomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [projectChat]);

  return (
    <div className="relative h-full max-h-full flex-col">
      <div className="h-[4%]">
        <h3 className="text-2xl font-semibold">Project Chat</h3>
      </div>

      <div className="no-scrollbar h-full max-h-[83%] overflow-x-hidden overflow-y-scroll pt-8">
        {projectChat.length === 0 ? (
          <NoChatItemsImage />
        ) : (
          <ChatMessages zoomRef={scrollZoomRef} />
        )}

        <NewMessageInput zoomRef={scrollZoomRef} />
      </div>
    </div>
  );
}
