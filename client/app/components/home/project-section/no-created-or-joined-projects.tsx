import CreateProjectBtn from "@/components/home/create-project";
import JoinProjectBtn from "@/components/home/join-project";
import Image from "next/image";

export default function NoCreatedOrJoinedProject({
  currentProjectTab,
}: {
  currentProjectTab: "created" | "joined";
}) {
  return (
    <>
      <h4 className="pb-10 text-center font-primary text-2xl text-slate-400 lg:text-5xl">
        {currentProjectTab === "created" && "No Projects Created Yet."}
        {currentProjectTab === "joined" && "No Projects Joined Yet."}
      </h4>

      <div className="self-center">
        <Image
          src="./illustrations/no-projects.svg"
          alt="no-projects"
          width={80}
          height={80}
          className="w-96 lg:w-[30rem]"
        />
      </div>

      <div className="self-center pt-10">
        {currentProjectTab === "created" && <CreateProjectBtn />}
        {currentProjectTab === "joined" && <JoinProjectBtn />}
      </div>
    </>
  );
}
