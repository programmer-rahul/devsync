import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import FileControls from "../sidebar-panel/file-explorer/file-controls";
import RenameProjectItem from "../sidebar-panel/file-explorer/rename-project-item";
import Image from "next/image";

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
  const selectedFolderId = useStore((state) => state.selectedFolderId);
  const setSelectedFolderId = useStore((state) => state.setSelectedFolderId);

  const [isRenamingItem, setIsRenamingItem] = useState(false);

  const handleFolderClick = () => {
    setIsCollapsed(!isCollapsed);
    console.log("selected folder id : ", selectedFolderId);

    if (selectedFolderId === folderId) return;
    setSelectedFolderId(folderId);
  };

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-md border-2 border-transparent px-1",
        folderId === ":root" && "hidden",
        selectedFolderId === folderId &&
          "border-main bg-main/40 font-semibold ",
      )}
    >
      <div
        className="relative flex w-full items-center"
        onClick={handleFolderClick}
      >
        {/* collapse icon */}
        <div
          className={cn(
            "absolute -left-5 top-1/2 w-5 -translate-y-1/2 -rotate-90",
            isCollapsed && "rotate-0",
          )}
        >
          <Image
            src="/files/collapse-folder.svg"
            width={20}
            height={20}
            alt="collapse-folder"
          />
        </div>

        {/* folder icon  */}
        <div className="mr-1 w-5">
          <Image
            src="/files/default-folder.svg"
            width={40}
            height={40}
            alt="folder-icon"
          />
        </div>

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
