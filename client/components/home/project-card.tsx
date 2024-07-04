"use client";

import { Project as ProjectInterface } from "@/app/components/types/project";
import CardOptions from "./card/card-options";
import CardFileFolderCount from "./card/card-file-folder-count";
import CardConnectedUserCount from "./card/card-connected-user-count";
import CardOwner from "./card/card-owner";
import CardOpenProjectBtn from "./card/card-open-project-btn";
import CardProjectName from "./card/card-project-name";

export default function ProjectCard({
  owner,
  projectName,
  projectId,
  counts,
}: ProjectInterface) {
  return (
    <div className="text-car w-96 space-y-3 rounded-md border-emerald-600 bg-secondary px-8 py-6 shadow">
      <div className="flex items-center justify-between border-main/40">
        <CardProjectName projectName={projectName} />
        <CardOptions projectId={projectId} />
      </div>

      <div className="flex justify-between space-y-2 border-b-2 border-t-2 border-main/50 py-2">
        <CardFileFolderCount counts={counts} />
        <CardConnectedUserCount counts={counts} />
      </div>

      <div className="flex items-center justify-between">
        <CardOwner owner={owner} />
        <CardOpenProjectBtn owner={owner} projectId={projectId} />
      </div>
    </div>
  );
}
