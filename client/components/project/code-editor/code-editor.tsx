import CodeArea from "./code-area";
import EditorStatusBar from "./editor-status-bar";
import EditorTabs from "./editor-tabs";

export default function CodeEditor() {
  return (
    <section className="w-full rounded-lg border flex flex-col">
      {/* editor tabs  */}

      <EditorTabs />

      {/* code area */}
      <CodeArea />

      {/* status bar  */}
      <EditorStatusBar />
    </section>
  );
}
