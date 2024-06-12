import { Message as MessageInterface } from "@/app/components/types/chat";
import { useStore } from "@/components/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SOCKET_ENUMS } from "@/lib/constants";
import { cn, formatMessageDate } from "@/lib/utils";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function ChatPanel() {
  const scrollZoomRef = useRef<HTMLDivElement>(null);

  const [messageText, setMessageText] = useState("");

  const socket = useStore((state) => state.socket);
  const projectChat = useStore((state) => state.projectChat);
  const addMessageInProjectChat = useStore(
    (state) => state.addMessageInProjectChat,
  );

  const sendMessageHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!messageText.trim() || !socket) return;

    socket.emit(SOCKET_ENUMS.SEND_MESSAGE, { message: messageText });

    addMessageInProjectChat({
      createdAt: new Date(),
      message: messageText,
      sender: "You",
      isYour: true,
    });

    setMessageText("");

    scrollIntoLastMessage();
  };

  const scrollIntoLastMessage = () => {
    if (scrollZoomRef.current)
      scrollZoomRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollIntoLastMessage();
  }, [projectChat]);

  return (
    <div className="relative h-full max-h-full flex-col">
      <div className="h-[4%]">
        <h3 className="text-2xl">Project Chat</h3>
      </div>
      <div className="no-scrollbar h-full max-h-[83%] overflow-x-hidden overflow-y-scroll pt-8">
        <div className="messages flex h-full flex-col gap-4">
          {projectChat?.map(({ createdAt, message, sender, isYour }, index) => {
            return (
              <div className={cn("message self-start", isYour && "self-end")}>
                <ChatMessage
                  key={index}
                  message={message}
                  sender={sender}
                  createdAt={createdAt}
                  isYour={isYour}
                />
              </div>
            );
          })}

          <div ref={scrollZoomRef} className="pb-20" />
        </div>

        <form
          className="input absolute bottom-5 left-1/2 flex w-full -translate-x-1/2 items-center gap-2"
          onSubmit={sendMessageHandler}
        >
          <Input
            className="border-2"
            placeholder="Type here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          <Button className="h-8" type="submit">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

const ChatMessage = ({
  createdAt,
  message,
  sender,
  isYour,
}: MessageInterface) => {
  const formatedDate = formatMessageDate(createdAt);

  return (
    <>
      <div className="flex flex-col rounded-md bg-lime-800 px-2 py-1 leading-5">
        <p>{message}</p>
        <p className="self-end text-xs tracking-tighter text-zinc-400">
          {formatedDate}
        </p>
      </div>
      <div className={cn("text-sm text-zinc-400", isYour && "text-end")}>
        {sender}
      </div>
    </>
  );
};
