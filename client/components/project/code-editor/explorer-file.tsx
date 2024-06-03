import { File as FileInterface } from "@/app/components/types/explorer";
import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";
import FileControls from "../sidebar-panel/file-explorer/file-controls";
import { useRef, useState } from "react";
import useProjectCrud from "@/hooks/useProjectCrud";
import RenameProjectItem from "../sidebar-panel/file-explorer/rename-project-item";

export default function ExplorerFile({
  name: fileName,
  id: fileId,
  type,
  content,
}: FileInterface) {
  // hook
  const { renameProjectItem } = useProjectCrud();

  // zustand store states
  const selectedFile = useStore((state) => state.selectedFile);
  const setSelectedFile = useStore((state) => state.setSelectedFile);
  const addEditorTab = useStore((state) => state.addEditorTab);

  // state
  const [isRenamingItem, setIsRenamingItem] = useState(false);
  const [inputValue, setInputValue] = useState<string | null>(null);

  // ref
  const inputRef = useRef<HTMLInputElement | null>(null);

  const fileClickHandler = () => {
    if (selectedFile?.id === fileId) return;

    setSelectedFile({ name: fileName, id: fileId, type, content });

    if (!content) content = "";
    addEditorTab({ name: fileName, id: fileId, content });
  };

  const inputKeyPressHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      const newFileName = inputRef.current?.value!;
      if (newFileName.trim() === fileName) return;

      renameProjectItem({
        itemId: fileId,
        itemType: "file",
        newName: newFileName,
        toEmit: true,
      });

      setIsRenamingItem(false);
    }
  };

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-md py-1 pl-4 text-primary",
        selectedFile?.id === fileId && "font-semibold text-lime-500/80",
      )}
    >
      <div
        className="flex flex-1 items-center gap-3"
        onClick={fileClickHandler}
      >
        <div className="w-5">{fileIcon}</div>
        <RenameProjectItem
          itemId={fileId}
          itemName={fileName}
          itemType="file"
          isRenaming={isRenamingItem}
          setIsRenaming={setIsRenamingItem}
        />
      </div>
      <div
        className={cn(
          "transition-all group-hover:block",
          selectedFile?.id === fileId && "block",
        )}
      >
        <FileControls
          type="file"
          id={fileId}
          setIsRenaming={setIsRenamingItem}
        />
      </div>
    </div>
  );
}

const fileIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3"
        stroke="#333"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>
);
