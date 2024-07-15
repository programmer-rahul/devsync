import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import useProjectCrud from "@/hooks/useProjectCrud";
import { Dispatch, SetStateAction, useState } from "react";
import { LuPencilLine, LuTrash2 } from "react-icons/lu";

export default function FolderFileControls({
  type,
  id,
  setIsRenaming,
}: {
  type: "file" | "folder";
  id: string;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
}) {
  // hook
  const { deleteProjectItem } = useProjectCrud();

  // to manage dialog state
  const [isDialog, setIsDialog] = useState(false);

  // to delete item
  function deleteItemHandler() {
    deleteProjectItem({ itemType: type, itemId: id, toEmit: true });
    setIsDialog(false);
  }

  // to rename item
  function renameItemHandler() {
    setIsRenaming(true);
  }

  // cancel renaming or deletion
  function cancelItemHandler() {
    setIsDialog(false);
  }

  return (
    <div className="flex items-center gap-3 ml-1 text-xl">
      <div
        className="text-primary opacity-70 hover:opacity-100 transition"
        onClick={renameItemHandler}
      >
        <LuPencilLine />
      </div>

      <Dialog open={isDialog} onOpenChange={setIsDialog}>
        <DialogTrigger>
          <div className="text-primary opacity-70 hover:opacity-100 transition">
            <LuTrash2 />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="text-2xl">Delete {type}</DialogHeader>
          <DialogDescription>
            <p className="text-secondary-foreground">
              Are you sure you want to delete this {type}?
            </p>
            <div className="flex justify-end py-4">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="lg" onClick={cancelItemHandler}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  size="lg"
                  onClick={deleteItemHandler}
                >
                  Delete
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
