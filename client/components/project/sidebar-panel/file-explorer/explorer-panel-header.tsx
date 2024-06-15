import { useStore } from "@/components/store/useStore";
import Image from "next/image";

export default function ExplorerPanelHeader() {
  const updateCreatingProjectItem = useStore(
    (state) => state.updateCreatingProjectItem,
  );
  const projectName = useStore((state) => state.currentProjectName);

  const createFileHandler = () => {
    updateCreatingProjectItem(true, "file");
  };

  const createFolderHandler = () => {
    updateCreatingProjectItem(true, "folder");
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold capitalize">{projectName}</h2>
      <div className="flex gap-2">
        <div
          className="grid w-8 cursor-pointer place-content-center rounded-md bg-primary px-1 py-[.1rem] text-secondary transition-all hover:bg-primary/70"
          onClick={createFileHandler}
        >
          <Image
            src="/files/add-new-file.svg"
            width={30}
            height={30}
            alt="addNewFile"
          />
        </div>
        <div
          className="grid w-8 cursor-pointer place-content-center rounded-md bg-primary px-1 py-[.1rem] text-secondary transition-all hover:bg-primary/70"
          onClick={createFolderHandler}
        >
          <Image
            src="/files/add-new-folder.svg"
            width={30}
            height={30}
            alt="addNewFile"
          />
        </div>
      </div>
    </div>
  );
}
