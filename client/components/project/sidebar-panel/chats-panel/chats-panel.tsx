import ChatMessages from "@/app/components/project/sidebar-panel/chat-panel/chat-messages";
import NewMessageInput from "@/app/components/project/sidebar-panel/chat-panel/new-message-input";
import NoChatItemsImage from "@/app/components/project/sidebar-panel/chat-panel/no-chat-items-image";
import { useStore } from "@/components/store/useStore";

import { useEffect, useRef } from "react";

export default function ChatPanel() {
  const scrollZoomRef = useRef<HTMLDivElement>(null);

  const projectChat = useStore((state) => state.projectChat);

  useEffect(() => {
    if (scrollZoomRef.current)
      scrollZoomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [projectChat]);

  return (
    <div className="relative h-full max-h-full flex-col">
      <div className="h-[4%]">
        <h3 className="text-2xl">Project Chat</h3>
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
