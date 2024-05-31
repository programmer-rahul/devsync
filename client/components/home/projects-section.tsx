"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "./project-card";
import { useStore } from "../store/useStore";
import { useEffect } from "react";
import useSocket from "@/hooks/useSocket";
import { SOCKET_ENUMS } from "@/lib/constants";

export default function ProjectsSection() {
  const createdProjects = useStore((state) => state.createdProjects);

  return (
    <section>
      <Tabs defaultValue="createdProjects" className="w-full">
        <TabsList className="mx-auto grid w-1/2 grid-cols-2">
          <TabsTrigger value="createdProjects">Created Projects</TabsTrigger>
          <TabsTrigger value="joinedProjects">Joined Projects</TabsTrigger>
        </TabsList>

        <TabsContent
          value="createdProjects"
          className="flex flex-wrap justify-around gap-2"
        >
          {createdProjects?.map(({ owner, projectName, projectId }) => (
            <ProjectCard
              key={projectId}
              owner={owner}
              projectName={projectName}
              projectId={projectId}
            />
          ))}
        </TabsContent>

        <TabsContent
          value="joinedProjects"
          className="flex flex-wrap justify-around gap-2"
        ></TabsContent>
      </Tabs>
    </section>
  );
}
