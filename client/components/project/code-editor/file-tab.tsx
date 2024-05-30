import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";

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
    console.log("clicked", e.target);
    console.log("clicked", e.currentTarget);

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
  };

  return (
    <div
      className={cn(
        "fileTab flex cursor-pointer items-center gap-2 rounded-lg bg-primary-foreground/80 px-2 py-1 transition-all select-none",
        isActive
          ? "text-secondary-foreground hover:bg-primary-foreground"
          : "text-secondary-foreground/40 hover:text-secondary-foreground",
      )}
      onClick={tabClickHandler}
    >
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
