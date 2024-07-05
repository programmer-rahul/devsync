"use client";

import { useStore } from "@/components/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { SOCKET_ENUMS } from "@/lib/constants";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
export default function CardOptions({ projectId }: { projectId: string }) {
  // store
  const {
    socket,
    userCreatedProjectsList,
    removeProjectinCreatedProjectsList,
    removeProjectinJoinedProjectsList,
  } = useStore((state) => state);

  //   to delete project
  function deleteProjectHandler() {
    const isYourProjectCard = userCreatedProjectsList.some(
      (project) => project.projectId === projectId,
    );

    if (isYourProjectCard) {
      removeProjectinCreatedProjectsList(projectId);
      socket &&
        socket.emit(SOCKET_ENUMS.DELETE_PROJECT, { projectId: projectId });
    } else {
      removeProjectinJoinedProjectsList(projectId);
    }
  }

  //   to copy project url
  function copyProjectUrlHandler() {
    const projectUrl = window.location.href + "project/" + projectId;

    window.navigator.clipboard
      .writeText(projectUrl)
      .then(() =>
        toast.success("Copied to clipboard", { position: "bottom-right" }),
      )
      .catch(() => toast.error("Couldn't copy", { position: "bottom-right" }));
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-6 rotate-90 cursor-pointer">
            {<PiDotsThreeOutlineFill className="h-6 w-6" />}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-secondary">
          <DropdownMenuItem onClick={deleteProjectHandler}>
            Delete
          </DropdownMenuItem>

          <DropdownMenuItem onClick={copyProjectUrlHandler}>
            Copy project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
