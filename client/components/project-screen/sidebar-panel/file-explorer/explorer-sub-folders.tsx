"use client";

import { Dispatch, SetStateAction } from "react";
import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";
import NewExplorerItemCreationInput from "./new-explorer-item-creation-input";
import ExplorerFile from "./explorer-file";
import ExplorerFolder from "./explorer-folder";
import {
  File as FileInterface,
  Folder as FolderInterface,
} from "@/types/explorer";

interface ExplorerSubFoldersProps {
  folderId: string;
  subFolders: FolderInterface[];
  folderName: string;
  files: FileInterface[];
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function ExplorerSubFolders({
  folderId,
  subFolders,
  folderName,
  files,
  isCollapsed,
  setIsCollapsed,
}: ExplorerSubFoldersProps) {
  // zunstand store states
  const { selectedFolderId, creatingProjectItem } = useStore((state) => state);

  return (
    <div
      className={cn("block", folderId !== ":root" && !isCollapsed && "hidden")}
    >
      {/* subfolders  */}
      <RenderSubFolders subFolders={subFolders} />

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
      <RenderFiles files={files} />
    </div>
  );
}

function RenderSubFolders({ subFolders }: { subFolders: FolderInterface[] }) {
  return (
    <>
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
    </>
  );
}
function RenderFiles({ files }: { files: FileInterface[] }) {
  return (
    <>
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
    </>
  );
}
