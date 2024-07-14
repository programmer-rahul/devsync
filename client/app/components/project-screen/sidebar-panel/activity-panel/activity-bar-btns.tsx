import { PiFiles, PiChatCircleDots, PiUser } from "react-icons/pi";
import { TbSettings } from "react-icons/tb";
import ActivityBarButtton from "../../../../../components/project-screen/activity-bar/activity-bar-btn";
import { ActivityBarButtons } from "@/types/project";
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

type ActivityBtn = {
  Icon: IconType;
  name: ActivityBarButtons;
};

const activityIconsList: ActivityBtn[] = [
  { Icon: PiFiles, name: "files" },
  { Icon: PiChatCircleDots, name: "chats" },
  { Icon: PiUser, name: "users" },
  { Icon: TbSettings, name: "settings" },
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
    </div>
  );
}
