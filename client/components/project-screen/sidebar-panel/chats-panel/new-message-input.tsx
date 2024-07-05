import { FormEvent, RefObject, useState } from "react";
import { useStore } from "@/components/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SOCKET_ENUMS } from "@/lib/constants";

export default function NewMessageInput({
  zoomRef,
}: {
  zoomRef: RefObject<HTMLDivElement>;
}) {
  // store
  const { socket, addMessageInProjectChat } = useStore((state) => state);

  //   message value
  const [messageText, setMessageText] = useState("");

  function sendMessageHandler(event: FormEvent<HTMLFormElement>) {
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

    if (zoomRef.current) zoomRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <form
      className="input absolute bottom-5 left-1/2 flex w-full -translate-x-1/2 items-center gap-2"
      onSubmit={sendMessageHandler}
    >
      <Input
        className="border-2"
        placeholder="Type here..."
        value={messageText}
        onChange={function (e) {
          setMessageText(e.target.value);
        }}
      />

      <Button className="h-8" type="submit">
        Send
      </Button>
    </form>
  );
}
