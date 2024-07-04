import { Message as MessageInterface } from "@/types/chat";
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
      <div className="flex flex-col rounded-md border border-main/30 bg-main/50 px-2 py-1 leading-5">
        <p className="font-secondary font-semibold">{message}</p>
        <p className="font-secondary self-end text-xs tracking-tighter opacity-60">
          {formatedDate}
        </p>
      </div>
      <div className={cn("text-sm opacity-60", isYour && "text-end")}>
        {sender}
      </div>
    </>
  );
}
