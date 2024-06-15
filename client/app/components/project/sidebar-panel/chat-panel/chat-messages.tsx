import { useStore } from "@/components/store/useStore";
import { RefObject } from "react";
import ChatMessage from "./chat-message";
import { cn } from "@/lib/utils";

export default function ChatMessages({
  zoomRef,
}: {
  zoomRef: RefObject<HTMLDivElement>;
}) {
  const projectChat = useStore((state) => state.projectChat);

  return (
    <div className="messages flex h-full flex-col gap-4">
      {projectChat?.map(({ createdAt, message, sender, isYour }, index) => {
        return (
          <div
            className={cn("message self-start", isYour && "self-end")}
            key={index}
          >
            <ChatMessage
              message={message}
              sender={sender}
              createdAt={createdAt}
              isYour={isYour}
            />
          </div>
        );
      })}

      <div ref={zoomRef} className="pb-20" />
    </div>
  );
}
