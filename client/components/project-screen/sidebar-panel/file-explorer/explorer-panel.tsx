"use client";

import ExplorerPanelHeader from "./explorer-panel-header";
import FileExplorer from "./file-explorer";

export default function ExplorerPanel() {
  return (
    <div className="flex flex-col h-full">
      <ExplorerPanelHeader />
      <FileExplorer />
    </div>
  );
}
