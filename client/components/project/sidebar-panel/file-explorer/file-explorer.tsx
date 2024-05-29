import ExplorerFolder from "../../code-editor/explorer-folder";
import { useStore } from "@/components/store/useStore";

export default function FileExplorer() {
  const projectStructure = useStore((state) => state.projectStructure);

  return (
    <div>
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
