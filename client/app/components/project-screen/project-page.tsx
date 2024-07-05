import CodeEditor from "@/components/project-screen/code-editor/code-editor";
import MountProjectSocketEvents from "@/components/project-screen/mount-project-socket-events";
import SideBarPanel from "@/components/project-screen/sidebar-panel/sidebar-panel";
import ActivityBar from "./sidebar-panel/activity-panel/activity-bar";

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
