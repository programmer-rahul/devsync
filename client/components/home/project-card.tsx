"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { useStore } from "../store/useStore";

interface ProjectCardProps {
  owner: string;
  projectName: string;
  projectId: string;
}

export default function ProjectCard({
  owner,
  projectName,
  projectId,
}: ProjectCardProps) {
  const updatedCurrentUsername = useStore(
    (state) => state.updatedCurrentUsername,
  );

  return (
    <div className="text-car w-80 space-y-3 rounded-md border-emerald-600 bg-secondary px-6 py-4 shadow">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold capitalize">{projectName}</div>
        <div className="flex gap-2">
          <Link
            href={`/project/${projectId}`}
            onClick={() => {
              updatedCurrentUsername(owner);
            }}
          >
            <Button className="h-7">Open</Button>
          </Link>
          <div className="w-6 rotate-90 cursor-pointer">{dotSvg}</div>
        </div>
      </div>

      <div className="space-y-2 rounded-sm border border-emerald-600/50 py-2">
        <div className="pl-2 text-xl">
          <div className="flex">
            <p>Folders</p>
            <p className="font-semibold">- 5</p>
          </div>
          <div className="flex">
            <p>Files</p>
            <p className="font-semibold">- 7</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="rounded-r-full bg-emerald-600/90 px-8 py-1 pl-2">
            <p className="flex items-end gap-1">
              <span>By</span>
              <span className="text-xl font-semibold underline">{"you"}</span>
            </p>
          </div>

          <div className="flex items-center gap-1 pr-2">
            <p className="h-3 w-3 rounded-full bg-green-600"></p>
            <p>6</p>
          </div>
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
