"use client";

import ExplorerFolder from "./explorer-folder";
import { useStore } from "@/components/store/useStore";

export default function FileExplorer() {
  const { projectStructure, setSelectedFolderId } = useStore((state) => state);

  function handleOutsideClickOnExplorer(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (event.currentTarget !== event.target) return;
    setSelectedFolderId(":root");
  }

  return (
    <div
      className="h-full pt-2 font-secondary"
      onClick={handleOutsideClickOnExplorer}
    >
      <ExplorerFolder
        key={projectStructure.id}
        id={projectStructure.id}
        name={projectStructure.name}
        files={projectStructure.files}
        subFolders={projectStructure.subFolders}
        type={projectStructure.type}
      />
    </div>
  );
}
