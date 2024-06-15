import { useStore } from "@/components/store/useStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import useProjectCrud from "@/hooks/useProjectCrud";
import { deleteItemToProject } from "@/lib/project-structure-utils";
import { DialogDescription } from "@radix-ui/react-dialog";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

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
      <div className="w-5" onClick={renameItemHandler}>
        {/* {type === "file" ? fileRenameIcon : folderRenameIcon} */}

        <Image
          src={`/files/rename-${type}.svg`}
          width={40}
          height={40}
          alt="rename-icon"
        />
      </div>

      <Dialog open={isDialog} onOpenChange={setIsDialog}>
        <DialogTrigger>
          <div className="w-5">
          <Image
          src={'/files/delete-file-folder.svg'}
          width={40}
          height={40}
          alt="rename-icon"
        />
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

// const folderRenameIcon = (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     className="w-full"
//   >
//     <path
//       fill-rule="evenodd"
//       clip-rule="evenodd"
//       d="M4 2C2.34315 2 1 3.34315 1 5V9V10V19C1 20.6569 2.34315 22 4 22H7C7.55228 22 8 21.5523 8 21C8 20.4477 7.55228 20 7 20H4C3.44772 20 3 19.5523 3 19V10V9C3 8.44772 3.44772 8 4 8H11.7808H13.5H20.1C20.5971 8 21 8.40294 21 8.9V9C21 9.55228 21.4477 10 22 10C22.5523 10 23 9.55228 23 9V8.9C23 7.29837 21.7016 6 20.1 6H13.5H11.7808L11.3489 4.27239C11.015 2.93689 9.81505 2 8.43845 2H4ZM4 6C3.64936 6 3.31278 6.06015 3 6.17071V5C3 4.44772 3.44772 4 4 4H8.43845C8.89732 4 9.2973 4.3123 9.40859 4.75746L9.71922 6H4ZM22.1213 11.7071C20.9497 10.5355 19.0503 10.5355 17.8787 11.7071L16.1989 13.3869L11.2929 18.2929C11.1647 18.4211 11.0738 18.5816 11.0299 18.7575L10.0299 22.7575C9.94466 23.0982 10.0445 23.4587 10.2929 23.7071C10.5413 23.9555 10.9018 24.0553 11.2425 23.9701L15.2425 22.9701C15.4184 22.9262 15.5789 22.8353 15.7071 22.7071L20.5556 17.8586L22.2929 16.1213C23.4645 14.9497 23.4645 13.0503 22.2929 11.8787L22.1213 11.7071ZM19.2929 13.1213C19.6834 12.7308 20.3166 12.7308 20.7071 13.1213L20.8787 13.2929C21.2692 13.6834 21.2692 14.3166 20.8787 14.7071L19.8622 15.7236L18.3068 14.1074L19.2929 13.1213ZM16.8923 15.5219L18.4477 17.1381L14.4888 21.097L12.3744 21.6256L12.903 19.5112L16.8923 15.5219Z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const fileRenameIcon = (
//   <svg
//     className="w-full"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       fill-rule="evenodd"
//       clip-rule="evenodd"
//       d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V7C19 7.55228 19.4477 8 20 8C20.5523 8 21 7.55228 21 7V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM22.1213 10.7071C20.9497 9.53553 19.0503 9.53553 17.8787 10.7071L16.1989 12.3869L11.2929 17.2929C11.1647 17.4211 11.0738 17.5816 11.0299 17.7575L10.0299 21.7575C9.94466 22.0982 10.0445 22.4587 10.2929 22.7071C10.5413 22.9555 10.9018 23.0553 11.2425 22.9701L15.2425 21.9701C15.4184 21.9262 15.5789 21.8353 15.7071 21.7071L20.5556 16.8586L22.2929 15.1213C23.4645 13.9497 23.4645 12.0503 22.2929 10.8787L22.1213 10.7071ZM18.3068 13.1074L19.2929 12.1213C19.6834 11.7308 20.3166 11.7308 20.7071 12.1213L20.8787 12.2929C21.2692 12.6834 21.2692 13.3166 20.8787 13.7071L19.8622 14.7236L18.3068 13.1074ZM16.8923 14.5219L18.4477 16.1381L14.4888 20.097L12.3744 20.6256L12.903 18.5112L16.8923 14.5219Z"
//       fill="currentColor"
//     />
//   </svg>
// );

// const deleteIcon = (
//   <svg
//     viewBox="0 0 1024 1024"
//     xmlns="http://www.w3.org/2000/svg"
//     fill="currentColor"
//     className="w-full"
//   >
//     <g id="SVGRepo_iconCarrier">
//       <path
//         fill="currentColor"
//         d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
//       ></path>
//     </g>
//   </svg>
// );
