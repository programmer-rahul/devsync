import LoginSocket from "@/components/home-screen/login-socket";
import ProjectsSection from "@/app/components/home-screen/project-section/projects-section";
import Header from "../ui/header";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <section className="flex flex-1 flex-col gap-20  border-t-transparent p-4 md:justify-between md:gap-0 md:p-8">
        <ProjectsSection />
      </section>
      <LoginSocket />
    </>
  );
}
