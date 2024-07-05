"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import themeList from "monaco-themes/themes/themelist.json";
import useEditorTheme from "../../../../lib/editor/use-editor-theme";
import { useStore } from "@/components/store/useStore";

import { EditorFontSize, EditorLineHeight } from "@/types/editor";

const editorFontSizesArray: EditorFontSize[] = [10, 14, 16, 20, 24, 28, 40];
const editorLineHeightArray: EditorLineHeight[] = [1, 1.2, 1.4, 1.6, 1.8, 2];

export default function SettingsPanel() {
  const { updateProjectEditorTheme } = useEditorTheme();
  const { editorSettings, changeEditorFontSize, changeEditorLineHeight } =
    useStore((state) => state);

  const {
    theme: editorTheme,
    fontSize: editorFontSize,
    lineHeight: editorLineHeight,
  } = editorSettings;

  return (
    <div className="relative h-full max-h-full flex-col">
      {/* header  */}
      <div className="h-[4%]">
        <h3 className="text-center text-2xl font-semibold">Settings</h3>
      </div>

      <div className="no-scrollbar overflow-y-scrol h-full max-h-[83%] overflow-x-hidden pt-8 font-secondary">
        <div className="border-t-2 py-2">
          <h4 className="text-xl">Editor</h4>

          <div className="ml-16 space-y-2">
            {/* theme  */}
            <div className="flex items-center gap-3">
              <p className="min-w-20">Theme</p>
              <div className="options w-full">
                <Select
                  onValueChange={function (value) {
                    updateProjectEditorTheme(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={editorTheme} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(themeList).map((theme, index) => (
                        <SelectItem value={theme} key={index}>
                          {theme}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* font size  */}
            <div className="flex items-center gap-3">
              <p className="min-w-20">Font Size</p>
              <div className="options w-full">
                <Select
                  onValueChange={function (value) {
                    changeEditorFontSize(Number(value) as EditorFontSize);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={editorFontSize} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {editorFontSizesArray.map((fontSize, index) => (
                        <SelectItem value={String(fontSize)} key={index}>
                          {fontSize}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* line height  */}
            <div className="flex items-center gap-3">
              <p className="min-w-20">Line Height</p>
              <div className="options w-full">
                <Select
                  onValueChange={function (value) {
                    changeEditorLineHeight(Number(value) as EditorLineHeight);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={editorLineHeight} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {editorLineHeightArray.map((lineHeight, index) => (
                        <SelectItem value={String(lineHeight)} key={index}>
                          {lineHeight}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
