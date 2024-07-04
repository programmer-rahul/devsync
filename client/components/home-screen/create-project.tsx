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
import { SOCKET_ENUMS } from "@/lib/constants";
import { Project as ProjectInterface } from "@/types/project";

export default function CreateProjectBtn() {
  // store imports
  const {
    showWelcomeScreen,
    setShowWelcomeScreen,
    addProjectinCreatedProjectsList,
    socket,
  } = useStore((state) => state);

  // user input values
  const [userInput, setUserInput] = useState({
    username: "",
    projectName: "",
    projectId: "",
  });

  // to handle dialog box
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // create project handler
  const handleNewProjectCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, projectName, projectId } = userInput;

    if (username.trim() === "" || projectName.trim() === "") return;
    setIsDialogOpen(false);

    // update createProjects
    let newProject: ProjectInterface = {
      owner: username,
      projectName,
      projectId,
      counts: {
        filesCount: 0,
        foldersCount: 0,
        connectedUsersCount: 0,
      },
    };

    // add project in projects list
    addProjectinCreatedProjectsList(newProject);

    if (showWelcomeScreen) {
      setShowWelcomeScreen(false);
    } else {
      socket && socket.emit(SOCKET_ENUMS.CREATE_PROJECT, newProject);
    }
  };

  // to change projectId every time when opening dialog box
  useEffect(() => {
    if (isDialogOpen) {
      setUserInput({
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
                value={userInput.username}
                onChange={(event) =>
                  setUserInput((prev) => ({
                    ...prev,
                    username: event.target.value,
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
                value={userInput.projectName}
                onChange={(event) =>
                  setUserInput((prev) => ({
                    ...prev,
                    projectName: event.target.value,
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
                value={userInput.projectId}
                onChange={(event) =>
                  setUserInput((prev) => ({
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
