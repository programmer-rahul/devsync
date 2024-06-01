"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { useStore } from "../store/useStore";
import { SOCKET_ENUMS } from "@/lib/constants";

interface ProjectCardProps {
  owner: string;
  projectName: string;
  projectId: string;
}

export default function ProjectCard({
  owner,
  projectName,
  projectId,
}: ProjectCardProps) {
  const updatedCurrentUsername = useStore(
    (state) => state.updatedCurrentUsername,
  );
  const socket = useStore((state) => state.socket);

  return (
    <Card className="w-5/12 max-w-80">
      <CardHeader>
        <CardTitle>Owner : {owner}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="project-name text-2xl">
          <p>{projectName}</p>
        </div>
        <div className="project-id text-xs">
          <p>{projectId}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/project/${projectId}`}
          onClick={() => {
            updatedCurrentUsername(owner);
            socket &&
              socket.emit(SOCKET_ENUMS.JOIN_PROJECT, {
                username: owner,
                projectName: projectName,
                projectId: projectId,
              });
          }}
        >
          <Button className="ml-auto">Open</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
