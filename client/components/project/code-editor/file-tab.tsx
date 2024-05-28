import { cn } from "@/lib/utils";

interface FileTabProps {
  isActive: boolean;
  fileName: string;
}

export default function FileTab({ isActive = false, fileName }: FileTabProps) {
  return (
    <div
      className={cn(
        "fileTab flex cursor-pointer items-center gap-2 rounded-lg bg-primary-foreground/80 px-2 py-1 transition-all",
        isActive
          ? "text-secondary-foreground hover:bg-primary-foreground"
          : "text-secondary-foreground/40 hover:text-secondary-foreground",
      )}
    >
      <p>{fileName}</p>
      <div className="grid h-4 w-4 place-content-center">
        <p className={cn("rotate-45 text-3xl", !isActive && "hidden")}>+</p>
      </div>
    </div>
  );
}
