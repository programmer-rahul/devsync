"use client";

import { cn } from "@/lib/utils";
import { Folder as FolderInterface } from "@/app/components/types/explorer";
import { useRef, useState } from "react";
import ExplorerFile from "./explorer-file";
import ExplorerFolderName from "./explorer-folder-name";
import { Input } from "@/components/ui/input";
import { useStore } from "@/components/store/useStore";
import { addItemToProject } from "@/lib/project-structure-utils";
import { v4 as uuid } from "uuid";

export default function ExplorerFolder({
  id: folderId,
  name: folderName,
  files,
  subFolders,
}: FolderInterface) {
  const inputRef = useRef<HTMLInputElement>(null);

  const projectStructure = useStore((state) => state.projectStructure);
  const updateProjectStructure = useStore(
    (state) => state.updateProjectStructure,
  );
  const selectedFolderId = useStore((state) => state.selectedFolderId);
  const creatingProjectItem = useStore((state) => state.creatingProjectItem);
  const updateCreatingProjectItem = useStore(
    (state) => state.updateCreatingProjectItem,
  );

  const [isCollapsed, setIsCollapsed] = useState(false);

  // input
  const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let text = (event.target as HTMLInputElement).value;
    let type = creatingProjectItem.type;

    if (event.key === "Enter" && text.trim() !== "") {
      createProjectItem({ type, text });
    }
    if (event.key === "Escape") {
      updateCreatingProjectItem(false, "file");
    }
  };

  const onInputBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    if (!inputRef.current || inputRef.current.value.trim() === "") return;

    createProjectItem({
      type: creatingProjectItem.type,
      text: inputRef.current.value,
    });
  };

  const createProjectItem = ({
    type,
    text,
  }: {
    type: "file" | "folder";
    text: string;
  }) => {
    let response;

    if (type === "file") {
      response = addItemToProject(projectStructure, selectedFolderId, type, {
        id: uuid(),
        name: text.trim(),
        type: "file",
        content: "",
      });
    } else {
      response = addItemToProject(projectStructure, selectedFolderId, type, {
        id: uuid(),
        name: text.trim(),
        type: "folder",
        files: [],
        subFolders: [],
      });
    }

    console.log("response", response);
    if (response.status) {
      updateProjectStructure(response.updatedProject);
      updateCreatingProjectItem(false, "file");
    }
  };

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
