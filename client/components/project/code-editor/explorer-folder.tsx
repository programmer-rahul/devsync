"use client";

import { cn } from "@/lib/utils";
import { Folder as FolderInterface } from "@/app/components/types/explorer";
import { useState } from "react";
import ExplorerFile from "./explorer-file";
import ExplorerFolderName from "./explorer-folder-name";

export default function ExplorerFolder({
  id: folderId,
  name: folderName,
  files,
  subFolders,
}: FolderInterface) {
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
