"use client";

import { cn } from "@/lib/utils";
import { Folder as FolderInterface } from "@/types/explorer";
import { useEffect, useRef, useState } from "react";
import ExplorerFile from "./explorer-file";
import ExplorerFolderName from "./explorer-folder-name";
import { Input } from "@/components/ui/input";
import { useStore } from "@/components/store/useStore";

import useProjectCrud from "@/hooks/useProjectCrud";
import { FaFolder } from "react-icons/fa";
import { getLanguageIcon } from "@/lib/editor/get-language-icon";
import NewExplorerItemCreationInput from "./new-explorer-item-creation-input";

export default function ExplorerFolder({
  id: folderId,
  name: folderName,
  files,
  subFolders,
}: FolderInterface) {
  // zunstand store states
  const selectedFolderId = useStore((state) => state.selectedFolderId);
  const creatingProjectItem = useStore((state) => state.creatingProjectItem);
  const updateCreatingProjectItem = useStore(
    (state) => state.updateCreatingProjectItem,
  );

  // to maintain folder collapsing state
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn("select-none py-1", folderId !== ":root" && "pl-2")}>
      {/* folder name  */}
      <ExplorerFolderName
        folderId={folderId}
        folderName={folderName}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* subfolders and files  */}
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
          <NewExplorerItemCreationInput
            folderName={folderName}
            folderId={folderId}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
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
