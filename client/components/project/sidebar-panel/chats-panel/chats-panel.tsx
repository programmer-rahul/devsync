import { Message as MessageInterface } from "@/app/components/types/chat";
import { useStore } from "@/components/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SOCKET_ENUMS } from "@/lib/constants";
import { useState } from "react";

export default function ChatPanel() {
  const [messageText, setMessageText] = useState("");

  const socket = useStore((state) => state.socket);
  const projectChat = useStore((state) => state.projectChat);
  const addMessageInProjectChat = useStore(
    (state) => state.addMessageInProjectChat,
  );

  const sendMessageHandler = () => {
    if (!messageText.trim() || !socket) return;

    socket.emit(SOCKET_ENUMS.SEND_MESSAGE, { message: messageText });

    addMessageInProjectChat({
      createdAt: new Date(),
      message: messageText,
      sender: "You",
      isYour: true,
    });
  };

  return (
    <div className="flex h-full flex-col">
      <div>
        <h3 className="text-2xl">Project Chat</h3>
      </div>
      <div className="flex h-full flex-col justify-between gap-2 py-4">
        <div className="messages flex flex-col gap-4">
          {projectChat?.map(({ createdAt, message, sender, isYour }, index) => {
            return (
              <div className="message self-start">
                <ChatMessage
                  message={message}
                  sender={sender}
                  createdAt={createdAt}
                />
              </div>
            );
          })}
        </div>
        <div className="input flex gap-2">
          <Input
            className="border-2"
            placeholder="Type here..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />

          <Button onClick={sendMessageHandler}>Send</Button>
        </div>
      </div>
    </div>
  );
}

const ChatMessage = ({ createdAt, message, sender }: MessageInterface) => {
  return (
    <>
      <div className="flex flex-col rounded-md bg-lime-800 px-2 py-1 leading-5">
        <p>{message}</p>
        <p className="self-end text-xs tracking-tighter text-zinc-400">
          {String(createdAt)} ago
        </p>
      </div>
      <div className="text-sm text-zinc-400">{sender}</div>
    </>
  );
};
