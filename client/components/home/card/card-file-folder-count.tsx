import Image from "next/image";
import { FileFolderCounts } from "@/app/components/types/project";

export default function CardFileFolderCount({
  counts,
}: {
  counts: FileFolderCounts | undefined;
}) {
  return (
    <div className="pl-2 text-xl text-neutral-300">
      <div className="flex gap-1">
        <Image
          src={"/files/default-folder.svg"}
          width={25}
          height={25}
          alt="folder-icon"
        />
        <p>Folders</p>
        <p className="font-semibold">: {counts?.foldersCount}</p>
      </div>
      <div className="flex gap-1">
        <Image
          src={"/files/default-file.svg"}
          width={25}
          height={25}
          alt="file-icon"
        />
        <p>Files</p>
        <p className="font-semibold">: {counts?.filesCount}</p>
      </div>
    </div>
  );
}
