import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

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
        <Button className="ml-auto">
          <Link href={`/project/${projectId}`}>Open</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
