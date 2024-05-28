import ActivityBar from "@/components/project/activity-bar/activity-bar";
import SideBarPanel from "@/components/project/sidebar-panel/sidebar-panel";

export default function ProjectPage() {
  return (
    <main className="flex h-screen p-2">
      <ActivityBar />
      <SideBarPanel />
      <section></section>
    </main>
  );
}
