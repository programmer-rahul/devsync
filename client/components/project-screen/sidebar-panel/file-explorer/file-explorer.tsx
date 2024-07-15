"use client";

import ExplorerFolder from "./explorer-folder";
import { useStore } from "@/components/store/useStore";

export default function FileExplorer() {
  // store states
  const { projectStructure, setSelectedFolderId } = useStore((state) => state);

  // to select root folder when clicking on empty area at explorer-panel
  function handleOutsideClickOnExplorer(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (event.currentTarget !== event.target) return;
    setSelectedFolderId(":root");
  }

  return (
    <div
      className="h-full font-secondary"
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
