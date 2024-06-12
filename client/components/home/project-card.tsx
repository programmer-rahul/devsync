"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "../ui/button";
import Link from "next/link";
import { useStore } from "../store/useStore";
import { toast } from "react-toastify";
import { Project as ProjectInterface } from "@/app/components/types/project";
import { SOCKET_ENUMS } from "@/lib/constants";

export default function ProjectCard({
  owner,
  projectName,
  projectId,
  counts,
  isCreated,
}: ProjectInterface) {
  const socket = useStore((state) => state.socket);
  const updatedCurrentUsername = useStore(
    (state) => state.updatedCurrentUsername,
  );
  const removeProjectId = useStore((state) => state.removeProjectId);
  const removeProjectInProjects = useStore(
    (state) => state.removeProjectInProjects,
  );

  const copyProjectUrlHandler = () => {
    const projectUrl = window.location.href + "project/" + projectId;

    window.navigator.clipboard
      .writeText(projectUrl)
      .then(() =>
        toast.success("Copied to clipboard", { position: "bottom-right" }),
      )
      .catch(() => toast.error("Couldn't copy", { position: "bottom-right" }));
  };

  const deleteProjectHandler = () => {
    removeProjectId({ id: projectId });
    removeProjectInProjects({ projectId: projectId });
    isCreated &&
      socket &&
      socket.emit(SOCKET_ENUMS.DELETE_PROJECT, { projectId: projectId });
  };

  return (
    <div className="text-car w-96 space-y-3 rounded-md border-emerald-600 bg-secondary px-8 py-6 shadow">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-semibold capitalize">{projectName}</div>
        <div className="flex gap-2">
          <Link
            href={`/project/${projectId}`}
            onClick={() => {
              updatedCurrentUsername(owner);
            }}
          >
            <Button className="h-7">Open</Button>
          </Link>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-7 rotate-90 cursor-pointer">{dotSvg}</div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={deleteProjectHandler}>
                  Delete
                </DropdownMenuItem>

                <DropdownMenuItem onClick={copyProjectUrlHandler}>
                  Copy project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="space-y-2 rounded-sm border border-emerald-600/50 py-2">
        <div className="pl-2 text-2xl">
          <div className="flex">
            <p>Folders</p>
            <p className="font-semibold">- {counts?.foldersCount}</p>
          </div>
          <div className="flex">
            <p>Files</p>
            <p className="font-semibold">- {counts?.filesCount}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="rounded-r-full bg-emerald-600/90 px-8 py-1 pl-4">
            <p className="flex items-end gap-1">
              <span>By</span>
              <span className="text-xl font-semibold underline">{"you"}</span>
            </p>
          </div>

          {counts && counts.connectedUsersCount !== 0 && (
            <div className="flex items-center gap-1 pr-2">
              <p className="h-3 w-3 rounded-full bg-green-600"></p>
              <p>{String(counts?.connectedUsersCount)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const dotSvg = (
  <svg
    className="w-full"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 9.5C5.38071 9.5 6.5 10.6193 6.5 12C6.5 13.3807 5.38071 14.5 4 14.5C2.61929 14.5 1.5 13.3807 1.5 12C1.5 10.6193 2.61929 9.5 4 9.5Z"
      fill="currentColor"
    />
    <path
      d="M12 9.5C13.3807 9.5 14.5 10.6193 14.5 12C14.5 13.3807 13.3807 14.5 12 14.5C10.6193 14.5 9.5 13.3807 9.5 12C9.5 10.6193 10.6193 9.5 12 9.5Z"
      fill="currentColor"
    />
    <path
      d="M22.5 12C22.5 10.6193 21.3807 9.5 20 9.5C18.6193 9.5 17.5 10.6193 17.5 12C17.5 13.3807 18.6193 14.5 20 14.5C21.3807 14.5 22.5 13.3807 22.5 12Z"
      fill="currentColor"
    />
  </svg>
);
