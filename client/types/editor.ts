export type EditorTheme = string;
export type EditorFontSize = 10 | 14 | 16 | 20 | 24 | 28 | 40;
export type EditorLineHeight = 1 | 1.2 | 1.4 | 1.6 | 1.8 | 2;

export type EditorSettings = {
  theme: EditorTheme;
  fontSize: EditorFontSize;
  lineHeight: EditorLineHeight;
};
