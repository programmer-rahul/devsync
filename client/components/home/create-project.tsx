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
import { useStore } from "@/components/store/useStore";
import { LocalStorage } from "@/lib/helper";
import { SOCKET_ENUMS } from "@/lib/constants";
import { Project as ProjectInterface } from "@/app/components/types/project";

export default function CreateProjectBtn() {
  // store imports
  const showWelcomeScreen = useStore((state) => state.showWelcomeScreen);
  const setShowWelcomeScreen = useStore((state) => state.setShowWelcomeScreen);
  const addProjectInProjects = useStore((state) => state.addProjectinProjects);
  const addProjectId = useStore((state) => state.addProjectId);
  const socket = useStore((state) => state.socket);

  // user input values
  const [newProjectValues, setNewProjectValues] = useState({
    username: "",
    projectName: "",
    projectId: "",
  });
  // to handle dialog box
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // create project handler
  const handleNewProjectCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, projectName, projectId } = newProjectValues;

    if (username.trim() === "" || projectName.trim() === "") return;
    setIsDialogOpen(false);

    // update createProjects
    let newProject: ProjectInterface = {
      owner: username,
      projectName,
      projectId,
      isCreated: true,
      counts: {
        filesCount: 0,
        foldersCount: 0,
        connectedUsersCount: 0,
      },
    };
    addProjectId({ id: newProject.projectId, isCreated: true });
    addProjectInProjects(newProject);

    if (!showWelcomeScreen) {
      LocalStorage.set("isWelcomeScreen", false);
      setShowWelcomeScreen(true);
    }

    socket && socket.emit(SOCKET_ENUMS.CREATE_PROJECT, newProject);
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
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleNewProjectCreation}>
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
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
