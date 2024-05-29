import { File as FileInterface } from "@/app/components/types/explorer";
import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";

export default function ExplorerFile({
  name: fileName,
  id: fileId,
  type,
  content,
}: FileInterface) {
  const selectedFile = useStore((state) => state.selectedFile);
  const setSelectedFile = useStore((state) => state.setSelectedFile);

  const fileClickHandler = () => {
    if (selectedFile?.id === fileId) return;

    setSelectedFile({ name: fileName, id: fileId, type, content });
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md p-1 pl-5",
        selectedFile?.id === fileId && "font-semibold text-lime-500/80",
      )}
      onClick={fileClickHandler}
    >
      <div className="w-5">{fileIcon}</div>
      <p>{fileName}</p>
    </div>
  );
}

const fileIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        d="M19 9V17.8C19 18.9201 19 19.4802 18.782 19.908C18.5903 20.2843 18.2843 20.5903 17.908 20.782C17.4802 21 16.9201 21 15.8 21H8.2C7.07989 21 6.51984 21 6.09202 20.782C5.71569 20.5903 5.40973 20.2843 5.21799 19.908C5 19.4802 5 18.9201 5 17.8V6.2C5 5.07989 5 4.51984 5.21799 4.09202C5.40973 3.71569 5.71569 3.40973 6.09202 3.21799C6.51984 3 7.0799 3 8.2 3H13M19 9L13 3M19 9H14C13.4477 9 13 8.55228 13 8V3"
        stroke="#333"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></path>
    </g>
  </svg>
);