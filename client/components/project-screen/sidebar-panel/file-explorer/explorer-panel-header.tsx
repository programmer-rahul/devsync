"use client";

import { useStore } from "@/components/store/useStore";
import { LuFilePlus, LuFolderPlus } from "react-icons/lu";

export default function ExplorerPanelHeader() {
  // store states
  const { updateCreatingProjectItem, currentProjectName: projectName } =
    useStore((state) => state);

  return (
    <div className="flex items-center justify-between">
      {/* project name  */}
      <ProjectName name={projectName} />

      {/* file or folder creation icons  */}
      <FileFolderCreateIcons
        updateCreatingProjectItem={updateCreatingProjectItem}
      />
    </div>
  );
}

function ProjectName({ name }: { name: string }) {
  return <h2 className="text-2xl font-semibold capitalize">{name}</h2>;
}

function FileFolderCreateIcons({
  updateCreatingProjectItem,
}: {
  updateCreatingProjectItem: (status: boolean, type: "file" | "folder") => void;
}) {
  function createFileHandler() {
    updateCreatingProjectItem(true, "file");
  }

  function createFolderHandler() {
    updateCreatingProjectItem(true, "folder");
  }

  const iconClasses =
    "grid w-8 h-8 cursor-pointer place-content-center rounded-md border border-transparent px-1 py-[.1rem] text-secondary transition-all hover:border-main/70 hover:bg-main/20";

  return (
    <div className="flex gap-2">
      <LuFilePlus
        className={iconClasses}
        color="#f8fafc"
        onClick={createFileHandler}
      />
      <LuFolderPlus
        className={iconClasses}
        color="#f8fafc"
        onClick={createFolderHandler}
      />
    </div>
  );
}
