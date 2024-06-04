import CheckProjectAvailability from "@/components/project/check-project-availability";
import ProjectPageLoading from "@/app/components/project/project-page-loading";
import ProjectPageIsNotAvailable from "@/app/components/project/project-page-not-available";
import ProjectPage from "@/app/components/project/project-page";

export default function page() {
  return (
    <CheckProjectAvailability
      LoadingScreen={<ProjectPageLoading />}
      NotAvailableScreen={<ProjectPageIsNotAvailable />}
      ProjectPage={<ProjectPage />}
    />
  );
}
