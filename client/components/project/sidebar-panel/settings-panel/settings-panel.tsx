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
import useEditorTheme from "../../use-editor-theme";
import { useStore } from "@/components/store/useStore";

export default function SettingsPanel() {
  const { updateProjectEditorTheme } = useEditorTheme();
  const { editorTheme } = useStore((state) => state);

  return (
    <div className="relative h-full max-h-full flex-col">
      <div className="h-[4%]">
        <h3 className="text-center text-2xl font-semibold">Settings</h3>
      </div>

      <div className="no-scrollbar overflow-y-scrol h-full max-h-[83%] overflow-x-hidden pt-8">
        <div className="border-t-2 py-2">
          <p className="text-xl">Editor</p>
          <div className="ml-16">
            <div className="flex items-center gap-3">
              <p>Theme</p>
              <div className="options w-full">
                <Select
                  onValueChange={(value) => {
                    updateProjectEditorTheme(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={editorTheme} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(themeList).map((theme) => (
                        <SelectItem value={theme}>{theme}</SelectItem>
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
