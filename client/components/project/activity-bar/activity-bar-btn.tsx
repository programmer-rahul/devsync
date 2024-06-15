"use client";

import { cn } from "@/lib/utils";
import { ActivityBarButtons } from "@/app/components/types/project";
import { useStore } from "@/components/store/useStore";

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
        "flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-transparent px-3 py-2",
        currentActivityButton === name
          ? "bg-main/30 border-main/90 text-main"
          : "text-primary border-transparent",
      )}
      onClick={activityButtonClickHandler}
    >
      <div className="w-8">{icon}</div>
      <p className="select-none uppercase text-sm">{name}</p>
    </div>
  );
}
