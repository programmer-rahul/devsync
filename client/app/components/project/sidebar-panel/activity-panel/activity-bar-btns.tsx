import { PiFiles, PiChatCircleDots, PiUser } from "react-icons/pi";
import { TbSettings } from "react-icons/tb";
import ActivityBarButtton from "../../../../../components/project/activity-bar/activity-bar-btn";
import { ActivityBarButtons } from "@/app/components/types/project";
import { IconType } from "react-icons/lib";

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
    <div className="flex flex-col gap-4">
      {activityIconsList.map(({ Icon, name }, index) => (
        <ActivityBarButtton
          Icon={<Icon className="h-full w-full" />}
          name={name}
          key={index}
        />
      ))}
    </div>
  );
}
