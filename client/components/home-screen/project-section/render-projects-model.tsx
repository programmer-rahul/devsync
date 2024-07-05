"use client";

import { useState } from "react";
import { useStore } from "@/components/store/useStore";
import ProjectSectionTabs from "./project-section-tabs";
import RenderProjectCards from "./render-project-cards";
import NoCreatedOrJoinedProject from "./no-created-or-joined-projects";

export default function RenderProjectsModel() {
  // store states
  const { userCreatedProjectsList, userJoinedProjectsList } = useStore(
    (state) => state,
  );

  //   to check which tab is selected
  const [currentProjectTab, setCurrentProjectTab] = useState<
    "created" | "joined"
  >("created");

  return (
    <div className="flex w-full flex-col">
      {/* project tabs  */}
      <ProjectSectionTabs
        currentProjectTab={currentProjectTab}
        setCurrentProjectTab={setCurrentProjectTab}
      />

      {/* projects container */}
      <div className="flex h-full flex-col border-2 bg-primary-foreground p-4">
        {currentProjectTab === "created" ? (
          userCreatedProjectsList.length > 0 ? (
            <RenderProjectCards
              currentProjectTab={currentProjectTab}
              projects={userCreatedProjectsList}
            />
          ) : (
            <NoCreatedOrJoinedProject currentProjectTab={currentProjectTab} />
          )
        ) : userJoinedProjectsList.length > 0 ? (
          <RenderProjectCards
            currentProjectTab={currentProjectTab}
            projects={userJoinedProjectsList}
          />
        ) : (
          <NoCreatedOrJoinedProject currentProjectTab={currentProjectTab} />
        )}
      </div>
    </div>
  );
}
