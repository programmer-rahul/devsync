import Image from "next/image";
import { FileFolderCounts } from "@/app/components/types/project";
import { FaFolder, FaFile } from "react-icons/fa";

export default function CardFileFolderCount({
  counts,
}: {
  counts: FileFolderCounts | undefined;
}) {
  return (
    <div className="pl-2 text-xl text-neutral-300">
      <div className="flex items-center gap-1">
        <FaFolder color="#f8fafc" />
        <p>Folders</p>
        <p className="font-semibold">: {counts?.foldersCount}</p>
      </div>
      <div className="flex items-center gap-1">
        <FaFile color="#f8fafc" />
        <p>Files</p>
        <p className="font-semibold">: {counts?.filesCount}</p>
      </div>
    </div>
  );
}
