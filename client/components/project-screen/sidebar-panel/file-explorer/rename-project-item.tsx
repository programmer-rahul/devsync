import { Input } from "@/components/ui/input";
import useProjectCrud from "@/hooks/useProjectCrud";
import { Dispatch, SetStateAction, useRef, useState } from "react";

export default function RenameProjectItem({
  itemName,
  itemId,
  itemType,
  isRenaming,
  setIsRenaming,
}: {
  itemName: string;
  itemId: string;
  itemType: "file" | "folder";
  isRenaming: boolean;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
}) {
  // hook
  const { renameProjectItem } = useProjectCrud();

  // state
  const [inputValue, setInputValue] = useState<string | null>(null);

  // ref
  const inputRef = useRef<HTMLInputElement | null>(null);

  function inputKeyPressHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const newFileName = inputRef.current?.value!;
      if (newFileName.trim() === itemName) return;

      renameProjectItem({
        itemId: itemId,
        itemType: itemType,
        newName: newFileName,
        toEmit: true,
      });

      setIsRenaming(false);
    }
  }

  return (
    <div className="renaming flex h-6">
      {isRenaming ? (
        <Input
          className="h-full pl-1 text-base"
          value={inputValue === null ? itemName : inputValue}
          onChange={function (event) {
            setInputValue(event.target.value);
          }}
          ref={inputRef}
          onKeyDown={inputKeyPressHandler}
          autoFocus
        />
      ) : (
        <p className="h-full border border-transparent pl-1 text-base">
          {itemName}
        </p>
      )}
    </div>
  );
}
