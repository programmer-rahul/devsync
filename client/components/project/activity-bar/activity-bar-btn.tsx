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
    (state) => state,
  );

  // change selected activityBtn
  const activityButtonClickHandler = () => setActivityButton(name);

  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-transparent px-2 py-2",
        currentActivityButton === name
          ? "border-main/90 bg-main/30 text-main"
          : "border-transparent text-primary",
      )}
      onClick={activityButtonClickHandler}
    >
      <div className="h-8 w-8">{Icon}</div>
      <p className="select-none text-xs uppercase">{name}</p>
    </div>
  );
}
