"use client";

import { useStore } from "@/components/store/useStore";
import FileTab from "./file-tab";

export default function EditorTabs() {
  const openedEditorTabs = useStore((state) => state.openedEditorTabs);
  const selectedFileId = useStore((state) => state.selectedFile?.id);

  return (
    <div className="flex h-9 w-full items-center gap-2 rounded-tl-lg rounded-tr-lg bg-secondary px-3">
      {openedEditorTabs?.map(({ id, name }) => {
        return (
          <FileTab
            key={id}
            fileId={id}
            fileName={name}
            isActive={selectedFileId === id}
          />
        );
      })}
    </div>
  );
}
