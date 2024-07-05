"use client";

import { cn } from "@/lib/utils";
import { Folder as FolderInterface } from "@/types/explorer";
import ExplorerFolderName from "./explorer-folder-name";

import ExplorerSubFolders from "./explorer-sub-folders";
import { useState } from "react";

export default function ExplorerFolder({
  id: folderId,
  name: folderName,
  files,
  subFolders,
}: FolderInterface) {
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
      {subFolders && subFolders.length > 0 && (
        <ExplorerSubFolders
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          folderName={folderName}
          folderId={folderId}
          files={files || []}
          subFolders={subFolders}
        />
      )}
    </div>
  );
}
