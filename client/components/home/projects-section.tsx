"use client";

import ProjectCard from "./project-card";
import { useStore } from "../store/useStore";
import JoinProjectBtn from "./join-project";
import CreateProjectBtn from "./create-project";

export default function ProjectsSection() {
  const createdProjects = useStore((state) => state.createdProjects);
  const joinedProjects = useStore((state) => state.joinedProjects);

  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full gap-2">
        {/* projects  */}
        <div className="flex w-4/5 flex-col">
          <div className="flex self-start">
            <p className="after: relative cursor-pointer border-2 border-r-0 border-b-transparent px-6 py-2 text-xl">
              Your Projects
            </p>
            <p className="cursor-pointer border-2 border-b-transparent px-6 py-2 text-xl">
              Joined Projects
            </p>
          </div>

          <div className="flex h-full flex-wrap items-start gap-8 border-2 px-4 py-8">
            {createdProjects?.map(({ owner, projectName, projectId }) => (
              <ProjectCard
                key={projectId}
                owner={owner}
                projectName={projectName}
                projectId={projectId}
              />
            ))}
          </div>
        </div>

        <div className="h-full flex-1 pt-12">
          <div className="h-full border">
            <div className="flex flex-col gap-5 px-10 py-10">
              <CreateProjectBtn />
              <JoinProjectBtn />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
