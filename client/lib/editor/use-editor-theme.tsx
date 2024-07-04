"use client";

import { applyTheme } from "@/lib/editor/apply-theme";
import { useStore } from "../../components/store/useStore";

export default function useEditorTheme() {
  const { changeEditorTheme } = useStore((state) => state);

  const updateProjectEditorTheme = async (themeName: string) => {
    await applyTheme(themeName);
    changeEditorTheme(themeName);
  };

  return { updateProjectEditorTheme };
}
