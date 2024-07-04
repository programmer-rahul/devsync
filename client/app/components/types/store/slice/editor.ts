import {
  EditorFontSize,
  EditorLineHeight,
  EditorTheme,
  EditorThemeColors,
} from "../../editor";

export type EditorSlice = {
  // code editor
  openedEditorTabs: { name: string; id: string; content: string }[];
  removeEditorTab: (id: string) => { name: string; id: string }[];
  addEditorTab: ({
    name,
    id,
    content,
  }: {
    name: string;
    id: string;
    content: string;
  }) => void;

  // editor themes
  editorTheme: EditorTheme;
  changeEditorTheme: (theme: EditorTheme) => void;

  editorThemeColors: EditorThemeColors;
  changeEditorThemeColors: (newThemeColors: EditorThemeColors) => void;

  editorFontSize: EditorFontSize;
  changeEditorFontSize: (fontSize: EditorFontSize) => void;

  editorLineHeight: EditorLineHeight;
  changeEditorLineHeight: (lineHeight: EditorLineHeight) => void;
};
