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
      <h2 className="text-2xl font-semibold capitalize">{projectName}</h2>
      <div className="flex gap-2">
        <div
          className="grid w-8 cursor-pointer place-content-center rounded-md px-1 py-[.1rem] text-secondary transition-all border border-transparent hover:border-main/70 hover:bg-main/20"
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
          className="grid w-8 cursor-pointer place-content-center rounded-md px-1 py-[.1rem] text-secondary transition-all border border-transparent hover:border-main/70 hover:bg-main/20"
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
