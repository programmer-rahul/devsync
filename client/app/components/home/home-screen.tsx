import LoginScoket from "@/components/home/login-socket";
import ProjectsSection from "@/components/home/projects-section";

export default function HomeScreen() {
  return (
    <main className="flex flex-1 flex-col gap-20  border-t-transparent p-4 md:justify-between md:gap-0 md:p-8">
      <ProjectsSection />
      <LoginScoket />
    </main>
  );
}
