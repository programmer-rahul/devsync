"use client";

import { cn } from "@/lib/utils";
import { ActivityBarButtons } from "@/types/project";
import { useStore } from "@/components/store/useStore";

interface ActivityBarButtonProps {
  name: ActivityBarButtons;
  Icon: JSX.Element;
}

export default function ActivityBarButtton({
  name,
  Icon,
}: ActivityBarButtonProps) {
  const { currentActivityButton, setActivityButton } = useStore(
    (state) => state
  );

  // change selected activityBtn
  function activityButtonClickHandler() {
    setActivityButton(name);
  }

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center gap-1 rounded-md border py-2 px-1",
        currentActivityButton === name
          ? "border-main/60 bg-main/20 text-main activity-btn-glow"
          : "border-transparent text-primary"
      )}
      onClick={activityButtonClickHandler}
    >
      <div className="h-8 w-8">{Icon}</div>
      <p className="select-none text-xs uppercase tracking-tighter">{name}</p>
    </div>
  );
}
