"use client";

import { useStore } from "@/components/store/useStore";
import { useEffect } from "react";

export default function CodeArea() {
  const selectedFile = useStore((state) => state.selectedFile);

  let selectedFileCode = "";

  useEffect(() => {
    console.log("selectedFile", selectedFile);
  }, [selectedFile]);

  return (
    <div className="flex-1 border">
      <p>content :- {selectedFileCode}</p>
    </div>
  );
}
