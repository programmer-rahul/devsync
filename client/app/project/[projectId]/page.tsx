import ProjectPage from "@/app/components/project-screen/project-page";
import ProjectPageLoading from "@/app/components/project-screen/project-page-loading";
import ProjectPageIsNotAvailable from "@/app/components/project-screen/project-page-not-available";
import CheckProjectAvailability from "@/components/project-screen/check-project-availability";

export default function page() {
  return (
    <CheckProjectAvailability
      LoadingScreen={<ProjectPageLoading />}
      NotAvailableScreen={<ProjectPageIsNotAvailable />}
      ProjectPage={<ProjectPage />}
    />
  );
}
