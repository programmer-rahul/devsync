import { useStore } from "@/components/store/useStore";
import { Input } from "@/components/ui/input";
import useProjectCrud from "@/hooks/useProjectCrud";
import { getLanguageIcon } from "@/lib/editor/get-language-icon";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { FaFolder } from "react-icons/fa";

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

  const { creatingProjectItem, selectedFolderId, updateCreatingProjectItem } =
    useStore();

  // user input ref
  const inputRef = useRef<HTMLInputElement>(null);

  const [newItemText, setNewItemText] = useState(folderName);

  //   file language extention icon
  let NewFileIcon = getLanguageIcon(newItemText);

  // input
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
    if (
      selectedFolderId === folderId &&
      creatingProjectItem.status &&
      !isCollapsed
    ) {
      setIsCollapsed(true);
    }
    if (isCollapsed && selectedFolderId === folderId) {
      inputRef.current?.focus();
    }
  }, [
    creatingProjectItem,
    isCollapsed,
    folderId,
    selectedFolderId,
    setIsCollapsed,
  ]);

  return (
    <div className="flex items-center gap-1 pl-5">
      {creatingProjectItem.type === "folder" ? <FaFolder /> : <NewFileIcon />}
      <Input
        autoFocus
        className="h-7"
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
