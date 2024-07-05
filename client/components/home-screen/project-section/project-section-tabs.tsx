import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";

export default function ProjectSectionTabs({
  currentProjectTab,
  setCurrentProjectTab,
}: {
  currentProjectTab: "created" | "joined";
  setCurrentProjectTab: Dispatch<SetStateAction<"created" | "joined">>;
}) {
  return (
    <div className="flex self-start font-secondary">
      <p
        className={cn(
          "cursor-pointer border-2 border-r-0 border-b-transparent px-4 py-1 lg:px-6 lg:py-2 lg:text-xl",
          currentProjectTab === "created" &&
            "bg-primary-foreground font-semibold text-primary",
        )}
        onClick={function () {
          setCurrentProjectTab("created");
        }}
      >
        Your Projects
      </p>
      <p
        className={cn(
          "cursor-pointer border-2 border-b-transparent px-4 py-1 lg:px-6 lg:py-2 lg:text-xl",
          currentProjectTab === "joined" &&
            "bg-primary-foreground font-semibold text-primary",
        )}
        onClick={function () {
          setCurrentProjectTab("joined");
        }}
      >
        Joined Projects
      </p>
    </div>
  );
}
