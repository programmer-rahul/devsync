import ActivityBar from "@/components/project/activity-bar/activity-bar";
import CodeEditor from "@/components/project/code-editor/code-editor";
import MountProjectSocketEvents from "@/components/project/mount-project-socket-events";
import SideBarPanel from "@/components/project/sidebar-panel/sidebar-panel";

export default function ProjectPage() {
  return (
    <>
      <section className="flex w-full gap-2">
        <ActivityBar />
        <SideBarPanel />
        <CodeEditor />
      </section>

      <MountProjectSocketEvents/>
    </>
  );
}
