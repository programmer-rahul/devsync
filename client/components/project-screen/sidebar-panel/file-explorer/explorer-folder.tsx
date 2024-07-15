"use client";

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
    <div className="select-none">
      {/* folder name  */}
      <ExplorerFolderName
        folderId={folderId}
        folderName={folderName}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* subfolders and files  */}
      <ExplorerSubFolders
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        folderName={folderName}
        folderId={folderId}
        files={files || []}
        subFolders={subFolders || []}
      />
    </div>
  );
}
