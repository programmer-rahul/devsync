import LoginSocket from "@/components/home/login-socket";
import ProjectsSection from "@/components/home/projects-section";
import Header from "./header";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <section className="flex flex-1 flex-col gap-20  border-t-transparent p-4 md:justify-between md:gap-0 md:p-8">
        <ProjectsSection />
        <LoginSocket />
      </section>
    </>
  );
}
