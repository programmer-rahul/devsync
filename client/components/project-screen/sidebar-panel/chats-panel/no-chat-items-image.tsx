import Image from "next/image";

export default function NoChatItemsImage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 pt-20">
      <Image
        src="/illustrations/no-chats.svg"
        className="w-72"
        width={40}
        height={40}
        alt="no-file-selected"
      />
      <p className="text-3xl">Project Chat!</p>
    </div>
  );
}
