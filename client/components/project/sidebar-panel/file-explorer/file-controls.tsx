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
import { FaEdit, FaTrash } from "react-icons/fa";

export default function FileControls({
  type,
  id,
  setIsRenaming,
}: {
  type: "file" | "folder";
  id: string;
  setIsRenaming: Dispatch<SetStateAction<boolean>>;
}) {
  const { deleteProjectItem } = useProjectCrud();

  const [isDialog, setIsDialog] = useState(false);

  const deleteItemHandler = () => {
    deleteProjectItem({ itemType: type, itemId: id, toEmit: true });
    setIsDialog(false);
  };

  const renameItemHandler = () => {
    setIsRenaming(true);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-5 text-primary" onClick={renameItemHandler}>
        <FaEdit />
      </div>

      <Dialog open={isDialog} onOpenChange={setIsDialog}>
        <DialogTrigger>
          <div className="w-5 text-primary">
            <FaTrash />
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
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsDialog(false)}
                >
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
