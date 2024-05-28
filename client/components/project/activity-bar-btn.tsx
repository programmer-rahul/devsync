'use client'

import { useStore } from "../store/useStore";
import { cn } from "@/lib/utils";
import { ActivityBarButtons } from "@/app/components/types/project";

interface ActivityBarButtonProps {
  name: ActivityBarButtons;
  icon: JSX.Element;
}

export default function ActivityBarButtton({
  name,
  icon,
}: ActivityBarButtonProps) {
  const currentActivityButton = useStore(
    (state) => state.currentActivityButton,
  );
  const setActivityButton = useStore((state) => state.setActivityButton);

  const activityButtonClickHandler = ({}) => {
    setActivityButton(name);
  };

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center gap-1 rounded-lg p-4",
        currentActivityButton === name
          ? "bg-lime-800/60 text-lime-500"
          : "bg-primary-foreground text-primary",
      )}
      onClick={activityButtonClickHandler}
    >
      <div className="w-8">{icon}</div>
      <p className="uppercase">{name}</p>
    </div>
  );
}
