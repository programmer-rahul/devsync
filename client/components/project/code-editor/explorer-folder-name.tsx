import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import FileControls from "../sidebar-panel/file-explorer/file-controls";
import RenameProjectItem from "../sidebar-panel/file-explorer/rename-project-item";

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
        "group flex cursor-pointer items-center justify-between rounded-md p-1",
        folderId === ":root" && "hidden",
        selectedFolderId === folderId &&
          "bg-lime-800/60 font-semibold text-lime-500",
      )}
    >
      <div
        className="relative flex w-full items-center"
        onClick={handleFolderClick}
      >
        <div
          className={cn(
            "absolute -left-5 top-1/2 w-5 -translate-y-1/2 -rotate-90",
            isCollapsed && "rotate-0",
          )}
        >
          {collapseIcon}
        </div>
        <div className="mr-2 w-5">{folderIcon}</div>
        <RenameProjectItem
          itemId={folderId}
          itemName={folderName}
          itemType="folder"
          isRenaming={isRenamingItem}
          setIsRenaming={setIsRenamingItem}
        />
      </div>

      <div
        className={cn(
          "hidden transition-all group-hover:block",
          selectedFolderId === folderId && "block",
        )}
      >
        <FileControls
          type="folder"
          id={folderId}
          setIsRenaming={setIsRenamingItem}
        />
      </div>
    </div>
  );
}

const folderIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        d="M3 8.2C3 7.07989 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H9.67452C10.1637 5 10.4083 5 10.6385 5.05526C10.8425 5.10425 11.0376 5.18506 11.2166 5.29472C11.4184 5.4184 11.5914 5.59135 11.9373 5.93726L12.0627 6.06274C12.4086 6.40865 12.5816 6.5816 12.7834 6.70528C12.9624 6.81494 13.1575 6.89575 13.3615 6.94474C13.5917 7 13.8363 7 14.3255 7H17.8C18.9201 7 19.4802 7 19.908 7.21799C20.2843 7.40973 20.5903 7.71569 20.782 8.09202C21 8.51984 21 9.0799 21 10.2V15.8C21 16.9201 21 17.4802 20.782 17.908C20.5903 18.2843 20.2843 18.5903 19.908 18.782C19.4802 19 18.9201 19 17.8 19H6.2C5.07989 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

const collapseIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <path
      d="M7 10L12 15L17 10"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
