import { File as FileInterface } from "@/types/explorer";
import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";
import FolderFileControls from "./folder-file-controls";
import { useState } from "react";
import RenameProjectItem from "./rename-project-item";
import { getLanguageIcon } from "@/lib/editor/get-language-icon";

export default function ExplorerFile({
  name: fileName,
  id: fileId,
  type,
  content,
}: FileInterface) {
  // zustand store states
  const { selectedFile, setSelectedFile, addEditorTab } = useStore(
    (state) => state
  );

  // state
  const [isRenamingItem, setIsRenamingItem] = useState(false);

  const FileDisplayIcon = getLanguageIcon(fileName);

  function fileClickHandler() {
    if (selectedFile?.id === fileId) return;

    setSelectedFile({ name: fileName, id: fileId, type, content });

    if (!content) content = "";
    addEditorTab({ name: fileName, id: fileId, content });
  }

  return (
    <div
      className={cn(
        "group flex cursor-pointer items-center justify-between rounded-sm pl-1 text-primary",
        // if current file is selected file then set this styles
        selectedFile?.id === fileId && "font-semibold text-main"
      )}
    >
      {/* fileIcon and fileName  */}
      <div
        className="flex flex-1 items-center gap-1"
        onClick={fileClickHandler}
      >
        <FileDisplayIcon className="text-primary" />

        <RenameProjectItem
          itemId={fileId}
          itemName={fileName}
          itemType="file"
          isRenaming={isRenamingItem}
          setIsRenaming={setIsRenamingItem}
        />
      </div>

      {/* file control icons  */}
      <div
        className={cn(
          "hidden transition-all",
          selectedFile?.id === fileId && "block"
        )}
      >
        <FolderFileControls
          type="file"
          id={fileId}
          setIsRenaming={setIsRenamingItem}
        />
      </div>
    </div>
  );
}
