import { Project } from "@/app/components/types/project";
import ProjectCard from "../project-card";

export default function RenderProjectCards({
  currentProjectTab,
  projects,
}: {
  currentProjectTab: "created" | "joined";
  projects: Project[];
}) {
  return (
    <>
      <h4 className="pb-6 text-center font-primary text-2xl text-slate-400 lg:text-3xl">
        {currentProjectTab === "created" && "Projects You've Created."}
        {currentProjectTab === "joined" && "Projects You're Collaborating On."}
      </h4>
      <div className="flex flex-wrap items-start justify-center gap-8 lg:justify-start">
        {projects?.map(
          ({ owner, projectName, projectId, counts}) => {

            return (
              <ProjectCard
                key={projectId}
                owner={owner}
                projectName={projectName}
                projectId={projectId}
                counts={counts}
                // isCreated={true}
              />
            );
          },
        )}
      </div>
    </>
  );
}
