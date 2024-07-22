import { useStore } from "@/components/store/useStore";
import { getLanguageIcon } from "@/lib/editor/get-language-icon";
import { cn } from "@/lib/utils";
import { LuX } from "react-icons/lu";

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
  // store states
  const { selectedFile, setSelectedFile, removeEditorTab } = useStore(
    (state) => state
  );

  // to store file extention icon
  const FileTabIcon = getLanguageIcon(fileName);

  // on tab click
  function tabClickHandler(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    let current = e.target as HTMLElement;
    let currentClassList = current.classList.contains("closebtn");

    // if is close icon then don't select this file
    if (currentClassList) return;
    else
      setSelectedFile({
        id: fileId,
        name: fileName,
        type: "file",
      });
  }

  // on close tab click
  function closeTabHandler() {
    const availableTabs = removeEditorTab(fileId);

    if (selectedFile?.id === fileId && availableTabs.length > 0) {
      let { id, name } = availableTabs[0];
      setSelectedFile({ id, name, type: "file" });
    }
    if (!availableTabs.length) {
      setSelectedFile(null);
    }
  }

  return (
    <div
      className={cn(
        "fileTab flex cursor-pointer select-none items-center justify-center gap-2 px-2 py-1 font-secondary transition-all bg-secondary",
        isActive
          ? "text-secondary-foreground bg-main/30"
          : "text-secondary-foreground/40 hover:text-secondary-foreground"
      )}
      onClick={tabClickHandler}
    >
      {/* file extention icon  */}
      {<FileTabIcon />}

      {/* file name  */}
      <FileTabName name={fileName} />

      {/* close icon  */}
      <LuX className="closebtn mt-1" onClick={closeTabHandler} />
    </div>
  );
}

function FileTabName({ name }: { name: string }) {
  return <p>{name}</p>;
}
