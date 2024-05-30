"use client";

import { useStore } from "@/components/store/useStore";

export default function CodeArea() {
  const selectedFile = useStore((state) => state.selectedFile);

  return (
    <div className="flex-1 border">
      <p>{selectedFile?.content}</p>
    </div>
  );
}
