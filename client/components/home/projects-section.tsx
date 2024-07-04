"use client";

import { useState } from "react";
import Image from "next/image";

import { useStore } from "../store/useStore";
import { cn } from "@/lib/utils";

import CreateProjectBtn from "./create-project";
import JoinProjectBtn from "./join-project";
import ProjectCard from "./project-card";
import RenderProjectCards from "./project-section/render-project-cards";
import NoCreatedOrJoinedProject from "@/app/components/home/project-section/no-created-or-joined-projects";
import ProjectSectionTabs from "./project-section/project-section-tabs";

export default function ProjectsSection() {
  const { userCreatedProjectsList, userJoinedProjectsList } = useStore(
    (state) => state,
  );

  const [currentProjectTab, setCurrentProjectTab] = useState<
    "created" | "joined"
  >("created");

  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full gap-2">
        {/* projects  */}
        <div className="flex w-full flex-col">

          {/* project tabs  */}
          <ProjectSectionTabs
            currentProjectTab={currentProjectTab}
            setCurrentProjectTab={setCurrentProjectTab}
          />

          {/* projects container */}
          <div className="flex h-full flex-col border-2 bg-primary-foreground p-4">
            {currentProjectTab === "created" &&
            currentProjectTab.length === 0 ? (
              <NoCreatedOrJoinedProject currentProjectTab={currentProjectTab} />
            ) : (
              // render project cards
              <RenderProjectCards
                currentProjectTab={currentProjectTab}
                projects={userCreatedProjectsList}
              />
            )}

            {/* 
            {initialProjects.length === 0 && (
              <>
                <h4 className="pb-10 text-center font-primary text-2xl text-slate-400 lg:text-5xl">
                  {currentProjectTab
                    ? "No Projects Created Yet"
                    : "No Projects Joined Yet"}
                </h4>

                <div className="self-center">
                  <Image
                    src="./illustrations/no-projects.svg"
                    alt="no-projects"
                    width={80}
                    height={80}
                    className="w-96 lg:w-[30rem]"
                  />
                </div>

                <div className="self-center pt-10">
                  {currentProjectTab ? (
                    <CreateProjectBtn />
                  ) : (
                    <JoinProjectBtn />
                  )}
                </div>
              </>
            )} */}

            {/* if projects are available 
            {initialProjects.length > 0 && (
              <>
                <h4 className="pb-6 text-center font-primary text-2xl text-slate-400 lg:text-3xl">
                  {currentProjectTab
                    ? "Projects You've Created."
                    : "Projects You're Collaborating On."}
                </h4>
                <div className="flex flex-wrap items-start justify-center gap-8 lg:justify-start">
                  {initialProjects?.map(
                    ({ owner, projectName, projectId, counts, isCreated }) => {
                      // Check if it's your projects tab or not
                      const shouldRender = currentProjectTab
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
            )} */}
          </div>
        </div>
      </div>
    </section>
  );
}
