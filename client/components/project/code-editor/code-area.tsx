"use client";

import { useStore } from "@/components/store/useStore";
import useProjectCrud from "@/hooks/useProjectCrud";
import { useEffect, useState } from "react";

export default function CodeArea() {
  // hooks
  const selectedFile = useStore((state) => state.selectedFile);
  const openedEditorTabs = useStore((state) => state.openedEditorTabs);
  const { readFileContent } = useProjectCrud();

  // states
  const [currentFileContent, setCurrentFileContent] = useState("");

  useEffect(() => {
    if (selectedFile) {
      const { fileContent } = readFileContent({ fileId: selectedFile.id });
      setCurrentFileContent(fileContent);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (!openedEditorTabs.length) {
      setCurrentFileContent("");
    }
  }, [openedEditorTabs]);

  return (
    <div className="flex-1 border">
      <p>{currentFileContent}</p>
    </div>
  );
}
