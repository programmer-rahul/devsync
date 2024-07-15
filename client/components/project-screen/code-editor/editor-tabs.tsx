"use client";

import { useStore } from "@/components/store/useStore";
import FileTab from "./file-tab";

export default function EditorTabs() {
  const { openedEditorTabs, selectedFile } = useStore((state) => state);

  return (
    <div className="flex h-9 w-full items-center gap-2 px-3 pl-10 border-l border-t border-r">
      {openedEditorTabs?.map(({ id, name }) => {
        return (
          <FileTab
            key={id}
            fileId={id}
            fileName={name}
            isActive={selectedFile?.id === id}
          />
        );
      })}
    </div>
  );
}
