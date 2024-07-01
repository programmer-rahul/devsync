"use client";

import { useStore } from "@/components/store/useStore";
import useProjectCrud from "@/hooks/useProjectCrud";
import Image from "next/image";
import { useEffect, useState } from "react";
import MonacoEditor from "@/lib/editor/monaco-editor";
import { cn } from "@/lib/utils";

export default function CodeArea() {
  // hooks
  const selectedFile = useStore((state) => state.selectedFile);
  const openedEditorTabs = useStore((state) => state.openedEditorTabs);
  const { readFileContent, updateFileContent } = useProjectCrud();

  // states
  const [currentFileContent, setCurrentFileContent] = useState<string | null>(
    null,
  );

  const handleFileContentChange = (value: string | undefined) => {
    if (!value) return;

    setCurrentFileContent(value);

    if (currentFileContent?.trim() === value.trim()) return;

    // update updatedfilecontent in project
    if (!selectedFile) return;
    updateFileContent({
      fileId: selectedFile.id,
      updatedContent: value,
      toEmit: true,
    });
  };

  useEffect(() => {
    if (selectedFile) {
      const { fileContent } = readFileContent({ fileId: selectedFile.id });
      setCurrentFileContent(fileContent);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (!openedEditorTabs.length) {
      setCurrentFileContent(null);
    }
  }, [openedEditorTabs]);

  return (
    <div className="flex-1 border">
      {selectedFile === null && (
        <div className="flex h-full flex-col items-center justify-center gap-20 border text-xl lg:text-2xl xl:text-5xl">
          <Image
            src="/illustrations/no-file-selected.svg"
            className="w-96"
            width={40}
            height={40}
            alt="no-file-selected"
            priority
          />
          <p>No File Selected</p>
        </div>
      )}

      <div className={cn("h-full", !selectedFile && "hidden")}>
        <MonacoEditor
          value={currentFileContent ? currentFileContent : ""}
          onChange={handleFileContentChange}
        />
      </div>
    </div>
  );
}
