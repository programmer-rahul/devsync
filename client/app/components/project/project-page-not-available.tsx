import GobackOnHomePageBtn from "@/components/home/goback-on-home-page-btn";

export default function ProjectPageIsNotAvailable() {
  return (
    <div className="flex w-full items-center justify-center ">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-5xl">No Project Found</h3>
        <p className="text-3xl">wrong projectid</p>
        <GobackOnHomePageBtn />
      </div>
    </div>
  );
}
