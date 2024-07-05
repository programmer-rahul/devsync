"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/components/store/useStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import useProjectCrud from "@/hooks/useProjectCrud";
import MonacoEditor from "@/lib/editor/monaco-editor";

export default function CodeArea() {
  // hooks
  const { selectedFile, openedEditorTabs } = useStore((state) => state);
  const { readFileContent, updateFileContent } = useProjectCrud();

  // states
  const [currentFileContent, setCurrentFileContent] = useState<string | null>(
    null,
  );

  // handle current file content change
  function handleFileContentChange(value: string | undefined) {
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
  }

  // change file content when changing selected file
  useEffect(() => {
    if (selectedFile) {
      const { fileContent } = readFileContent({ fileId: selectedFile.id });
      setCurrentFileContent(fileContent);
    }
  }, [selectedFile, readFileContent]);

  // if there is no opened tabs then set file content to null
  useEffect(() => {
    if (!openedEditorTabs.length) {
      setCurrentFileContent(null);
    }
  }, [openedEditorTabs]);

  return (
    <div className="flex-1 border">
      {selectedFile === null && <NoSelectedFiles />}

      <div className={cn("h-full", !selectedFile && "hidden")}>
        <MonacoEditor
          value={currentFileContent ? currentFileContent : ""}
          onChange={handleFileContentChange}
        />
      </div>
    </div>
  );
}

function NoSelectedFiles() {
  return (
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
  );
}
