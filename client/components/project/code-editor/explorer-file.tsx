import { File as FileInterface } from "@/app/components/types/explorer";
import { useStore } from "@/components/store/useStore";
import { cn, getFileIcon } from "@/lib/utils";
import FileControls from "../sidebar-panel/file-explorer/file-controls";
import { useRef, useState } from "react";
import useProjectCrud from "@/hooks/useProjectCrud";
import RenameProjectItem from "../sidebar-panel/file-explorer/rename-project-item";
import Image from "next/image";

export default function ExplorerFile({
  name: fileName,
  id: fileId,
  type,
  content,
}: FileInterface) {
  // zustand store states
  const selectedFile = useStore((state) => state.selectedFile);
  const setSelectedFile = useStore((state) => state.setSelectedFile);
  const addEditorTab = useStore((state) => state.addEditorTab);

  // state
  const [isRenamingItem, setIsRenamingItem] = useState(false);

  const fileClickHandler = () => {
    if (selectedFile?.id === fileId) return;

    setSelectedFile({ name: fileName, id: fileId, type, content });

    if (!content) content = "";
    addEditorTab({ name: fileName, id: fileId, content });
  };

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-md py-1 pl-3 text-primary",
        selectedFile?.id === fileId && "font-semibold text-lime-500/80",
      )}
    >
      <div className="flex flex-1 items-end gap-1" onClick={fileClickHandler}>
        <div className="w-5">
          <Image
            src={getFileIcon(fileName)}
            width={20}
            height={20}
            alt="file-icon"
          />
        </div>
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
          "hidden transition-all group-hover:block",
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
