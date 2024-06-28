"use client";

import ProjectCard from "./project-card";
import { useStore } from "../store/useStore";
import { useState } from "react";
import { cn } from "@/lib/utils";
import CreateProjectBtn from "./create-project";
import JoinProjectBtn from "./join-project";

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
                "cursor-pointer border-2 border-r-0 border-b-transparent px-4 py-1 lg:px-6 lg:py-2 lg:text-xl",
                isYourProjectsTab &&
                  "bg-primary-foreground font-semibold text-primary",
              )}
              onClick={() => setIsYourProjectsTab(true)}
            >
              Your Projects
            </p>
            <p
              className={cn(
                "cursor-pointer border-2 border-b-transparent px-4 py-1 lg:px-6 lg:py-2 lg:text-xl",
                !isYourProjectsTab &&
                  "bg-primary-foreground font-semibold text-primary",
              )}
              onClick={() => setIsYourProjectsTab(false)}
            >
              Joined Projects
            </p>
          </div>

          <div className="flex h-full flex-col border-2 bg-primary-foreground p-4">
            {/* if there are not projects  */}
            {initialProjects.length === 0 && (
              <>
                <h4 className="pb-10 text-center font-secondary text-2xl text-slate-400 lg:text-5xl">
                  {isYourProjectsTab
                    ? "No Projects Created Yet"
                    : "No Projects Joined Yet"}
                </h4>

                <div className="self-center">
                  <img
                    src="./illustrations/no-projects.svg"
                    alt="no-projects"
                    className="w-96 lg:w-[30rem]"
                  />
                </div>

                <div className="self-center pt-10">
                  {isYourProjectsTab ? (
                    <CreateProjectBtn />
                  ) : (
                    <JoinProjectBtn />
                  )}
                </div>
              </>
            )}

            {/* if projects are available  */}
            {initialProjects.length > 0 && (
              <>
                <h4 className="pb-6 text-center font-secondary text-2xl text-slate-400 lg:text-3xl">
                  {isYourProjectsTab
                    ? "Projects You've Created."
                    : "Projects You're Collaborating On."}
                </h4>
                <div className="flex flex-wrap items-start justify-center gap-8 lg:justify-start">
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
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
