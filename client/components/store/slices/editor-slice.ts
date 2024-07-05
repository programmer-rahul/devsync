import { EditorSlice } from "@/types/store/slice/editor";
import { SetStateType } from "@/types/store/store";

export const createEditorSlice = (set: SetStateType): EditorSlice => ({
  // editor tabs
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
  editorSettings: { theme: "Blackboard", fontSize: 20, lineHeight: 1.6 },

  changeEditorTheme: (newTheme) =>
    set((state) => ({
      editorSettings: { ...state.editorSettings, theme: newTheme },
    })),

  changeEditorFontSize: (fontSize) =>
    set((state) => ({
      editorSettings: { ...state.editorSettings, fontSize: fontSize },
    })),

  changeEditorLineHeight: (lineHeight) =>
    set((state) => ({
      editorSettings: { ...state.editorSettings, lineHeight: lineHeight },
    })),
});
