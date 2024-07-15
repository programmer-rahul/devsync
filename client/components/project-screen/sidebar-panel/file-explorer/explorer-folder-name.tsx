import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import FileControls from "./file-controls";
import RenameProjectItem from "./rename-project-item";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

interface ExplorerFolderNameProps {
  folderName: string;
  folderId: string;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function ExplorerFolderName({
  folderId,
  folderName,
  isCollapsed,
  setIsCollapsed,
}: ExplorerFolderNameProps) {
  // store states
  const { selectedFolderId, setSelectedFolderId } = useStore((state) => state);

  // to check that is user is renaming folder or not
  const [isRenamingItem, setIsRenamingItem] = useState(false);

  // on folder clicks
  function handleFolderClick() {
    setIsCollapsed(!isCollapsed);

    if (selectedFolderId === folderId) return;
    setSelectedFolderId(folderId);
  }

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-sm border-2 border-transparent",
        selectedFolderId === folderId && "border-main bg-main/40 font-semibold",
        folderId === ":root" && "hidden"
      )}
    >
      <div
        className="relative flex w-full items-center"
        onClick={handleFolderClick}
      >
        {/* folder icon  */}
        <FolderIcon isCollapsed={isCollapsed} />

        {/* folder name  */}
        <RenameProjectItem
          itemId={folderId}
          itemName={folderName}
          itemType="folder"
          isRenaming={isRenamingItem}
          setIsRenaming={setIsRenamingItem}
        />
      </div>

      {/* folder controls  */}
      <div className={cn("hidden transition-all group-hover:block")}>
        <FileControls
          type="folder"
          id={folderId}
          setIsRenaming={setIsRenamingItem}
        />
      </div>
    </div>
  );
}

function FolderIcon({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="w-5">
      {isCollapsed ? (
        <FaFolderOpen color="#f8fafc" />
      ) : (
        <FaFolder color="#f8fafc" />
      )}
    </div>
  );
}
