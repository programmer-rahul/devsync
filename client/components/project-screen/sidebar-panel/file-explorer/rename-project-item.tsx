import { Input } from "@/components/ui/input";
import useProjectCrud from "@/hooks/useProjectCrud";
import { Dispatch, SetStateAction, useRef, useState } from "react";

interface RenameProjectItemProps {
  itemName: string;
  itemId: string;
  itemType: "file" | "folder";
  isRenaming: boolean;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
}

export default function RenameProjectItem({
  itemName,
  itemId,
  itemType,
  isRenaming,
  setIsRenaming,
}: RenameProjectItemProps) {
  // hook
  const { renameProjectItem } = useProjectCrud();

  // state
  const [inputValue, setInputValue] = useState<string | null>(null);

  // ref
  const inputRef = useRef<HTMLInputElement | null>(null);

  // on input key press
  function inputKeyPressHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (inputValue?.trim() === itemName) return;

      renameProjectItem({
        itemId: itemId,
        itemType: itemType,
        newName: inputValue || "",
        toEmit: true,
      });

      setIsRenaming(false);
    }
    if (event.key === "Escape") {
      setIsRenaming(false);
    }
  }

  // when user unfocus from input
  function onInputBlur() {
    if (!inputRef.current) return;
    setIsRenaming(false);
  }

  return (
    <div className="renaming h-7 grid place-content-center text-xl pl-1">
      {isRenaming ? (
        <Input
          autoFocus
          className="h-full"
          value={inputValue === null ? itemName : inputValue}
          ref={inputRef}
          onBlur={onInputBlur}
          onKeyDown={inputKeyPressHandler}
          onChange={function (event) {
            setInputValue(event.target.value);
          }}
        />
      ) : (
        <FileName name={itemName} />
      )}
    </div>
  );
}

function FileName({ name }: { name: string }) {
  return <p className="h-full">{name}</p>;
}
