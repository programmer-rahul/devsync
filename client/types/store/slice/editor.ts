import {
  EditorFontSize,
  EditorLineHeight,
  EditorSettings,
  EditorTheme,
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

  editorSettings: EditorSettings;
  changeEditorTheme: (theme: EditorTheme) => void;
  changeEditorFontSize: (fontSize: EditorFontSize) => void;
  changeEditorLineHeight: (lineHeight: EditorLineHeight) => void;
};
