import { FileFolderCounts } from "@/app/components/types/project";

export default function CardConnectedUserCount({
  counts,
}: {
  counts: FileFolderCounts | undefined;
}) {
  if (counts && counts.connectedUsersCount !== 0)
    return (
      <div className="flex items-center gap-1 self-end pr-2">
        <p className="h-3 w-3 rounded-full bg-green-600"></p>
        <p>{String(counts?.connectedUsersCount)}</p>
      </div>
    );
}
