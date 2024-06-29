import { EditorSlice, SetStateType } from "@/app/components/types/store";

export const createEditorSlice = (set: SetStateType): EditorSlice => ({
  openedEditorTabs: [],
  removeEditorTab: (id: string) => {
    let updatedEditorTabs;
    set((state) => {
      updatedEditorTabs = state.openedEditorTabs.filter((tab) => tab.id !== id);
      return { openedEditorTabs: updatedEditorTabs };
    });
    return updatedEditorTabs!;
  },

  addEditorTab: ({
    name,
    id,
    content,
  }: {
    name: string;
    id: string;
    content: string;
  }) => {
    set((state) => {
      let isAvailable = state.openedEditorTabs.some((tab) => tab.id === id);
      return {
        openedEditorTabs: isAvailable
          ? state.openedEditorTabs
          : [{ name, id, content }, ...state.openedEditorTabs.slice(0, 4)],
      };
    });
  },

  // editor theme
  editorTheme: "Blackboard",
  changeEditorTheme: (newTheme) =>
    set(() => ({
      editorTheme: newTheme,
    })),

  editorThemeColors: {
    "editor.background": "",
    "editor.foreground": "",
    "editor.lineHighlightBackground": "",
    "editor.selectionBackground": "",
    "editor.selectionHighlightBorder": "",
    "editorCursor.foreground": "",
    "editorIndentGuide.background": "",
    "editorWhitespace.foreground": "",
  },
  changeEditorThemeColors: (newThemeColors) =>
    set(() => ({
      editorThemeColors: newThemeColors,
    })),

  editorFontSize: 20,
  changeEditorFontSize: (fontSize) =>
    set(() => ({
      editorFontSize: fontSize,
    })),
});
