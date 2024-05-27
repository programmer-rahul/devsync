"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function CreateProjectBtn() {
  const [newProjectValues, setNewProjectValues] = useState({
    username: "",
    projectName: "",
    projectId: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      newProjectValues.username.trim() === "" ||
      newProjectValues.projectName.trim() === ""
    )
      return;

    console.log("submitted", newProjectValues);
    setIsDialogOpen(false);
  };

  // to change projectId every time when opening dialog box
  useEffect(() => {
    if (isDialogOpen) {
      setNewProjectValues({
        username: "",
        projectName: "",
        projectId: uuidv4(),
      });
    }
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          Create Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                User Name
              </Label>
              <Input
                id="username"
                placeholder="dev123"
                value={newProjectValues.username}
                onChange={(event) =>
                  setNewProjectValues((prev) => ({
                    ...prev,
                    username: event.target.value.toLocaleLowerCase(),
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectname" className="text-left">
                Project Name
              </Label>
              <Input
                id="projectname"
                placeholder="solution-123"
                value={newProjectValues.projectName}
                onChange={(event) =>
                  setNewProjectValues((prev) => ({
                    ...prev,
                    projectName: event.target.value.toLowerCase(),
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectId" className="text-left">
                Project Id
              </Label>
              <Input
                id="projectId"
                value={newProjectValues.projectId}
                onChange={(event) =>
                  setNewProjectValues((prev) => ({
                    ...prev,
                    projectId: event.target.value,
                  }))
                }
                className="col-span-3"
                disabled
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
