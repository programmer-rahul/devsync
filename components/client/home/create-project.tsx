"use client";
import { Button } from "@/components/ui/button";

export default function CreateProjectBtn() {
  const createNewProjectHandler = () => {};

  return (
    <Button variant="default" size="lg" onClick={createNewProjectHandler}>
      Create Project
    </Button>
  );
}
