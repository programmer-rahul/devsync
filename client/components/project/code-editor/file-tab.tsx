import { useStore } from "@/components/store/useStore";
import { cn, getFileIcon } from "@/lib/utils";
import Image from "next/image";

interface FileTabProps {
  isActive: boolean;
  fileName: string;
  fileId: string;
}

export default function FileTab({
  isActive = false,
  fileName,
  fileId,
}: FileTabProps) {
  const removeEditorTab = useStore((state) => state.removeEditorTab);
  const selectedFile = useStore((state) => state.selectedFile);
  const setSelectedFile = useStore((state) => state.setSelectedFile);

  const tabClickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (
      e.target instanceof HTMLElement &&
      e.target.classList.contains("closebtn")
    )
      return;

    setSelectedFile({
      id: fileId,
      name: fileName,
      type: "file",
    });
  };

  const closeTabHandler = () => {
    const availableTabs = removeEditorTab(fileId);

    if (selectedFile?.id === fileId && availableTabs.length > 0) {
      let { id, name } = availableTabs[0];
      setSelectedFile({ id, name, type: "file" });
    }
    if (!availableTabs.length) {
      setSelectedFile(null);
    }
  };

  return (
    <div
      className={cn(
        "fileTab font-secondary flex cursor-pointer select-none items-center gap-2 rounded-md bg-primary-foreground/80 px-2 py-1 transition-all",
        isActive
          ? "text-secondary-foreground hover:bg-primary-foreground"
          : "text-secondary-foreground/40 hover:text-secondary-foreground",
      )}
      onClick={tabClickHandler}
    >
      <Image
        src={getFileIcon(fileName)}
        width={20}
        height={20}
        alt="file-icon"
      />
      <p>{fileName}</p>
      <div className="grid h-4 w-4 place-content-center">
        <p
          className={cn(
            "closebtn rotate-45 text-3xl hover:text-destructive",
            !isActive && "hidden",
          )}
          onClick={closeTabHandler}
        >
          +
        </p>
      </div>
    </div>
  );
}
