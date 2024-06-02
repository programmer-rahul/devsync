"use client";

import { cn } from "@/lib/utils";
import { Folder as FolderInterface } from "@/app/components/types/explorer";
import { useEffect, useRef, useState } from "react";
import ExplorerFile from "./explorer-file";
import ExplorerFolderName from "./explorer-folder-name";
import { Input } from "@/components/ui/input";
import { useStore } from "@/components/store/useStore";

import useProjectCrud from "@/hooks/useProjectCrud";

export default function ExplorerFolder({
  id: folderId,
  name: folderName,
  files,
  subFolders,
}: FolderInterface) {
  const inputRef = useRef<HTMLInputElement>(null);

  // custom hook for managing project crud operations
  const { createProjectItem } = useProjectCrud();

  // zunstand store states
  const selectedFolderId = useStore((state) => state.selectedFolderId);
  const creatingProjectItem = useStore((state) => state.creatingProjectItem);
  const updateCreatingProjectItem = useStore(
    (state) => state.updateCreatingProjectItem,
  );

  // to maintain folder collapsing state
  const [isCollapsed, setIsCollapsed] = useState(false);

  // input
  const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let text = (event.target as HTMLInputElement).value;
    let type = creatingProjectItem.type;

    if (event.key === "Enter" && text.trim() !== "") {
      createProjectItem({ itemName: text, itemType: type, toEmit: true });
    }
    if (event.key === "Escape") {
      updateCreatingProjectItem(false, "file");
    }
  };

  // when user unfocus from input
  const onInputBlur = () => {
    if (!inputRef.current) return;

    if (inputRef.current.value.trim() === "")
      return updateCreatingProjectItem(false, "file");

    createProjectItem({
      itemType: creatingProjectItem.type,
      itemName: inputRef.current.value,
      toEmit: true,
    });
  };

  useEffect(() => {
    if (
      selectedFolderId === folderId &&
      creatingProjectItem.status &&
      !isCollapsed
    ) {
      setIsCollapsed(true);
    }
    if (isCollapsed && selectedFolderId === folderId) {
      inputRef.current?.focus();
    }
  }, [creatingProjectItem, isCollapsed]);

  return (
    <div className={cn("select-none py-1", folderId !== ":root" && "pl-2")}>
      {/* folder name  */}
      <ExplorerFolderName
        folderId={folderId}
        folderName={folderName}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <div
        className={cn(
          "block",
          folderId !== ":root" && !isCollapsed && "hidden",
        )}
      >
        {/* subfolders  */}
        {subFolders?.map(({ id, name, type, files, subFolders }) => {
          return (
            <ExplorerFolder
              key={id}
              id={id}
              name={name}
              type={type}
              files={files}
              subFolders={subFolders}
            />
          );
        })}

        {/* new project item creation input  */}
        {creatingProjectItem.status && selectedFolderId === folderId && (
          <div className="pl-5">
            <Input
              className="h-7"
              ref={inputRef}
              autoFocus
              onBlur={onInputBlur}
              onKeyDown={onInputKeyPress}
            />
          </div>
        )}

        {/* files  */}
        {files?.map(({ id, name, type, content }) => {
          return (
            <ExplorerFile
              key={id}
              id={id}
              name={name}
              type={type}
              content={content}
            />
          );
        })}
      </div>
    </div>
  );
}
