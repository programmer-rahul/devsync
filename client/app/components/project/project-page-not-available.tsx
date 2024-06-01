import GobackOnHomePageBtn from "@/components/home/goback-on-home-page-btn";

export default function ProjectPageIsNotAvailable() {
  return (
    <div className="flex w-full items-center justify-center ">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-4xl">This Project is not available</h3>
        <p className="text-2xl">Reason :- Wrong ProjectId</p>
        <GobackOnHomePageBtn />
      </div>
    </div>
  );
}
