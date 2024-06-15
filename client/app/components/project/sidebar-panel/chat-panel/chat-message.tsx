import { Message as MessageInterface } from "@/app/components/types/chat";
import { cn, formatMessageDate } from "@/lib/utils";

export default function ChatMessage({
  createdAt,
  message,
  sender,
  isYour,
}: MessageInterface) {
  const formatedDate = formatMessageDate(createdAt);

  return (
    <>
      <div className="flex flex-col rounded-md bg-main px-2 py-1 leading-5">
        <p>{message}</p>
        <p className="self-end text-xs tracking-tighter opacity-60">
          {formatedDate}
        </p>
      </div>
      <div className={cn("text-sm opacity-60", isYour && "text-end")}>
        {sender}
      </div>
    </>
  );
}
