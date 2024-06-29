"use client";

import monacoThemes from "monaco-themes/themes/themelist.json";

import { loader } from "@monaco-editor/react";

const applyTheme = async (themeName: string) => {
  const themeData = await import(
    `monaco-themes/themes/${monacoThemes["monokai"]}`
  );

  themeName &&
    loader.init().then((monaco) => {
      if (themeName.split(" ").length > 1) {
        themeName = themeName.split(" ")[0] + "-" + themeName.split(" ")[1];
      }
      monaco.editor.defineTheme(themeName, { ...themeData });
      monaco.editor.setTheme(themeName);
    });

  return themeData.colors;
};

export { applyTheme };
