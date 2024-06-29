import { useStore } from "@/components/store/useStore";
import Editor, { OnChange } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { getFileExtention } from "./utils";
import useEditorTheme from "@/components/project/use-editor-theme";

export default function MonacoEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: OnChange;
}) {
  const { updateProjectEditorTheme } = useEditorTheme();

  const [currentLanguage, setCurrentLanguage] = useState("javascript");

  const { selectedFile, editorTheme, editorFontSize } = useStore(
    (state) => state,
  );

  useEffect(() => {
    if (selectedFile) {
      const extention = getFileExtention(selectedFile.name);
      if (!extention) return;

      // if extention is in short form then convert it to full
      switch (extention) {
        case "ts":
          setCurrentLanguage("typescript");
          break;
        case "js":
          setCurrentLanguage("javascript");
          break;

        case "py":
          setCurrentLanguage("python");
          break;

        default:
          setCurrentLanguage(extention);
          break;
      }
    }
  }, [selectedFile]);

  return (
    <Editor
      language={currentLanguage}
      theme={"vs-dark"}
      loading={<h1>Opening.....</h1>}
      onMount={() => {
        updateProjectEditorTheme(editorTheme);
      }}
      value={value}
      onChange={onChange}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: editorFontSize,
      }}
    />
  );
}
