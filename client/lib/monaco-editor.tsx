import { useStore } from "@/components/store/useStore";
import Editor, { loader, OnChange } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { getFileExtention } from "./utils";
import monacoThemes from "monaco-themes/themes/themelist.json";

const loadTheme = async () => {
  const themeData = await import(
    `monaco-themes/themes/${monacoThemes["blackboard"]}`
  );

  loader.init().then((monaco) => {
    console.log("mounted", monaco);
    monaco.editor.defineTheme("blackboard", themeData);
    monaco.editor.setTheme("blackboard");
  });
};

export default function MonacoEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: OnChange;
}) {
  const [currentLanguage, setCurrentLanguage] = useState("javascript");

  const selectedFile = useStore((state) => state.selectedFile);

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

  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Editor
      language={currentLanguage}
      theme={"blackboard"}
      loading={<h1>Opening.....</h1>}
      value={value}
      onChange={onChange}
      options={{
        minimap: {
          enabled: false,
        },
        fontSize: 18,
      }}
    />
  );
}
