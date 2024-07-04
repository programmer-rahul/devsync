import RenderProjectsModel from "../../../../components/home/project-section/render-projects-model";

export default function ProjectsSection() {
  return (
    <section className="flex h-full w-full">
      <div className="flex h-full w-full gap-2">
        {/* projects  */}
        <RenderProjectsModel />
      </div>
    </section>
  );
}
