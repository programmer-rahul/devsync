import { useStore } from "@/components/store/useStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { toast } from "react-toastify";

import { SOCKET_ENUMS } from "@/lib/constants";

export default function CardOptions({
  isCreated,
  projectId,
}: {
  isCreated: boolean;
  projectId: string;
}) {
  // store
  const socket = useStore((state) => state.socket);
  const removeProjectId = useStore((state) => state.removeProjectId);
  const removeProjectInProjects = useStore(
    (state) => state.removeProjectInProjects,
  );

  //   to delete project
  const deleteProjectHandler = () => {
    removeProjectId({ id: projectId });
    removeProjectInProjects({ projectId: projectId });
    isCreated &&
      socket &&
      socket.emit(SOCKET_ENUMS.DELETE_PROJECT, { projectId: projectId });
  };

  //   to copy project url
  const copyProjectUrlHandler = () => {
    const projectUrl = window.location.href + "project/" + projectId;

    window.navigator.clipboard
      .writeText(projectUrl)
      .then(() =>
        toast.success("Copied to clipboard", { position: "bottom-right" }),
      )
      .catch(() => toast.error("Couldn't copy", { position: "bottom-right" }));
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="w-6 rotate-90 cursor-pointer">
            <Image
              src="/files/3-dots.svg"
              width={40}
              height={40}
              alt="card-options"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="font-secondary">
          <DropdownMenuItem onClick={deleteProjectHandler}>
            Delete
          </DropdownMenuItem>

          <DropdownMenuItem onClick={copyProjectUrlHandler}>
            Copy project
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
