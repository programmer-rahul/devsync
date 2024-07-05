import CodeArea from "./code-area";
import EditorTabs from "./editor-tabs";

export default function CodeEditor() {
  return (
    <section className="flex w-full flex-col rounded-lg border">
      {/* editor tabs  */}

      <EditorTabs />

      {/* code area */}
      <CodeArea />

      {/* status bar  */}
      {/* <EditorStatusBar /> */}
    </section>
  );
}
