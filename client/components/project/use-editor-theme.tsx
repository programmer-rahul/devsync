"use client";

import { applyTheme } from "@/lib/editor/apply-theme";
import { useStore } from "../store/useStore";

export default function useEditorTheme() {
  const changeEditorThemeColors = useStore(
    (state) => state.changeEditorThemeColors,
  );

  const updateProjectEditorTheme = async (themeName: string) => {
    const colors = await applyTheme(themeName);
    changeEditorThemeColors(colors);
  };

  return { updateProjectEditorTheme };
}
