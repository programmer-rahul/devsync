"use client";

import { applyTheme } from "@/lib/editor/apply-theme";
import { useStore } from "../store/useStore";

export default function useEditorTheme() {
  const { changeEditorThemeColors, changeEditorTheme } = useStore(
    (state) => state,
  );

  const updateProjectEditorTheme = async (themeName: string) => {
    const colors = await applyTheme(themeName);
    changeEditorThemeColors(colors);
    changeEditorTheme(themeName);
  };

  return { updateProjectEditorTheme };
}
