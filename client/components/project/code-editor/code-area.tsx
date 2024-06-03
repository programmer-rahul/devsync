"use client";

import { useStore } from "@/components/store/useStore";
import useProjectCrud from "@/hooks/useProjectCrud";
import { SOCKET_ENUMS } from "@/lib/constants";
import { ChangeEvent, useEffect, useState } from "react";

export default function CodeArea() {
  // hooks
  const selectedFile = useStore((state) => state.selectedFile);
  const openedEditorTabs = useStore((state) => state.openedEditorTabs);
  const socket = useStore((state) => state.socket);
  const { readFileContent, updateFileContent } = useProjectCrud();

  // states
  const [currentFileContent, setCurrentFileContent] = useState<string | null>(
    null,
  );

  const handleContentFileChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentFileContent(event.target.value);

    if (currentFileContent?.trim() === event.target.value.trim()) return;

    // update updatedfilecontent in project
    if (!selectedFile) return;
    updateFileContent({
      fileId: selectedFile.id,
      updatedContent: event.target.value,
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
      {currentFileContent === null ? (
        <div>No selected files</div>
      ) : (
        <div className="h-full p-2">
          <textarea
            className="h-full w-full outline-none bg-transparent text-xl"
            value={currentFileContent}
            onChange={handleContentFileChange}
          />
        </div>
      )}
    </div>
  );
}
