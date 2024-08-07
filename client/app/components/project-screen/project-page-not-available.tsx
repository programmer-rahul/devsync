import GobackOnHommePage from "@/components/project-screen/goback-on-home-page-btn";
import Image from "next/image";

export default function ProjectPageIsNotAvailable() {
  return (
    <section className="flex w-full items-center justify-center ">
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/illustrations/project-not-found.svg"
          width={200}
          height={200}
          alt="no-project-found-image"
        />
        <h3 className="text-5xl">No Project Found</h3>
        <p className="text-3xl">Wrong Projectid</p>
        <GobackOnHommePage />
      </div>
    </section>
  );
}
