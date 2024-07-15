import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";
import { ActivityBarButtons } from "@/types/project";
import ActivityBarButtton from "../../../../../components/project-screen/activity-bar/activity-bar-btn";

import { BiMessageDetail } from "react-icons/bi";
import { LuUsers, LuSettings, LuFiles } from "react-icons/lu";
import Image from "next/image";

type ActivityBtn = {
  Icon: IconType;
  name: ActivityBarButtons;
};

const activityIconsList: ActivityBtn[] = [
  { Icon: LuFiles, name: "files" },
  { Icon: BiMessageDetail, name: "chats" },
  { Icon: LuUsers, name: "users" },
  { Icon: LuSettings, name: "settings" },
];

export default function ActivityBarBtns() {
  return (
    <div className="flex flex-col gap-4 h-full pb-2">
      {activityIconsList.map(({ Icon, name }, index) => (
        <div key={index} className={cn(index > 2 && "mt-auto")}>
          <ActivityBarButtton
            Icon={<Icon className="h-full w-full" />}
            name={name}
          />
        </div>
      ))}
      <Image
        src="/logo/logo-icon.svg"
        width={20}
        height={20}
        alt="logo-icon"
        className="w-10 self-center"
      />
    </div>
  );
}
