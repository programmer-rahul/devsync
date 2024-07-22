import { useStore } from "@/components/store/useStore";
import { Input } from "@/components/ui/input";
import useProjectCrud from "@/hooks/useProjectCrud";
import { getLanguageIcon } from "@/lib/editor/get-language-icon";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { LuFolder } from "react-icons/lu";

export default function NewExplorerItemCreationInput({
  folderName,
  folderId,
  isCollapsed,
  setIsCollapsed,
}: {
  folderName: string;
  folderId: string;
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}) {
  // custom hook for managing project crud operations
  const { createProjectItem } = useProjectCrud();

  // store states
  const { creatingProjectItem, selectedFolderId, updateCreatingProjectItem } =
    useStore();

  // user input ref
  const inputRef = useRef<HTMLInputElement>(null);

  // new name for creation item
  const [newItemText, setNewItemText] = useState(folderName);

  //   file language extention icon
  let NewFileIcon = getLanguageIcon(newItemText);

  // input key press
  function onInputKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    let text = (event.target as HTMLInputElement).value;
    let type = creatingProjectItem.type;

    if (event.key === "Enter" && text.trim() !== "") {
      createProjectItem({
        itemName: text,
        itemType: type,
        toEmit: true,
        folderId: selectedFolderId,
      });
    }
    if (event.key === "Escape") {
      updateCreatingProjectItem(false, "file");
    }
  }

  // when user unfocus from input
  function onInputBlur() {
    if (!inputRef.current) return;

    if (inputRef.current.value.trim() === "")
      return updateCreatingProjectItem(false, "file");

    createProjectItem({
      itemType: creatingProjectItem.type,
      itemName: inputRef.current.value,
      toEmit: true,
      folderId: selectedFolderId,
    });
  }

  useEffect(() => {
    // for collapsing folder when creating new item inside that
    if (
      selectedFolderId === folderId &&
      creatingProjectItem.status &&
      !isCollapsed
    ) {
      setIsCollapsed(true);
    }
    // to auto focus inside input field when creating new item
    if (isCollapsed && selectedFolderId === folderId) {
      inputRef.current?.focus();
    }
  }, [selectedFolderId, isCollapsed]);

  return (
    <div className="flex items-center h-7 gap-2 pl-1">
      {/* render the icon based on item type  */}
      <div className="text-xl">
        {creatingProjectItem.type === "folder" ? <LuFolder /> : <NewFileIcon />}
      </div>
      {/* input field for user item name  */}
      <Input
        autoFocus
        className="h-full"
        ref={inputRef}
        onBlur={onInputBlur}
        onKeyDown={onInputKeyPress}
        onChange={function (e) {
          if (creatingProjectItem.type === "file")
            setNewItemText(e.target.value);
        }}
      />
    </div>
  );
}
