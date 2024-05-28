import { activityBarButtons } from "@/lib/svg";
import ActivityBarButtton from "./activity-bar-btn";
import { ActivityBarButtons } from "@/app/components/types/project";

export default function ActivityBar() {
  return (
    <section className="flex h-full w-auto flex-col rounded-lg bg-secondary p-2">
      <div className="flex flex-col gap-4">
        {activityBarButtons.map((button) => {
          return (
            <ActivityBarButtton
              key={button.name}
              icon={button.icon}
              name={button.name as ActivityBarButtons}
            />
          );
        })}
      </div>
    </section>
  );
}
