"use client";

import ProjectCard from "./project-card";
import { useStore } from "../store/useStore";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProjectsSection() {
  const initialProjects = useStore((state) => state.initialProjects);

  const [isYourProjectsTab, setIsYourProjectsTab] = useState(true);

  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full gap-2">
        {/* projects  */}
        <div className="flex w-full flex-col">
          <div className="flex self-start">
            <p
              className={cn(
                "cursor-pointer border-2 border-r-0 border-b-transparent px-6 py-2 text-xl",
                isYourProjectsTab &&
                  "bg-primary-foreground font-semibold text-primary",
              )}
              onClick={() => setIsYourProjectsTab(true)}
            >
              Your Projects
            </p>
            <p
              className={cn(
                "cursor-pointer border-2 border-b-transparent px-6 py-2 text-xl",
                !isYourProjectsTab &&
                  "bg-primary-foreground font-semibold text-primary",
              )}
              onClick={() => setIsYourProjectsTab(false)}
            >
              Joined Projects
            </p>
          </div>

          <div className="flex h-full flex-col border-2 bg-primary-foreground p-4">
            <h4 className="pb-6 text-3xl text-zinc-500">
              {isYourProjectsTab
                ? "All your created projects"
                : "All your recently joined projects"}
            </h4>
            <div className="flex flex-wrap items-start gap-8">
              {initialProjects?.map(
                ({ owner, projectName, projectId, counts, isCreated }) => {
                  // Check if it's your projects tab or not
                  const shouldRender = isYourProjectsTab
                    ? isCreated
                    : !isCreated;

                  // If shouldRender is false, don't render anything
                  if (!shouldRender) return null;

                  return (
                    <ProjectCard
                      key={projectId}
                      owner={owner}
                      projectName={projectName}
                      projectId={projectId}
                      counts={counts}
                      isCreated={isCreated}
                    />
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
