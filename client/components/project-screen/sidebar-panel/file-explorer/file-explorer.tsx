import ExplorerFolder from "../../code-editor/explorer-folder";
import { useStore } from "@/components/store/useStore";

export default function FileExplorer() {
  const projectStructure = useStore((state) => state.projectStructure);
  const setSelectedFolderId = useStore((state) => state.setSelectedFolderId);

  const handleSelectDefaultFolder = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.currentTarget !== event.target) return;
    setSelectedFolderId(":root");
  };

  return (
    <div
      className="font-secondary h-full pt-2"
      onClick={handleSelectDefaultFolder}
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
