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
  editorTheme: "vs-code",
  changeEditorTheme: (newTheme) =>
    set(() => ({
      editorTheme: newTheme,
    })),

  editorThemeColors: {},
  changeEditorThemeColors: (newThemeColors) =>
    set(() => ({
      editorThemeColors: newThemeColors,
    })),
});
