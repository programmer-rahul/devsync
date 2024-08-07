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
import { useState } from "react";
import { useStore } from "../store/useStore";
import Link from "next/link";

export default function JoinProjectBtn() {
  // store imports
  const {
    showWelcomeScreen,
    setShowWelcomeScreen,
    addProjectinJoinedProjectsList,
  } = useStore((state) => state);

  const [joinProjectValues, setJoinProjectValues] = useState({
    username: "",
    projectId: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleJoinProject() {
    const { projectId, username } = joinProjectValues;

    if (username.trim() === "" || projectId.trim() === "") return;
    setIsDialogOpen(false);

    addProjectinJoinedProjectsList({
      owner: "unknown",
      projectId,
      projectName: "unknown",
    });

    if (showWelcomeScreen) setShowWelcomeScreen(false);
  }

  function onProjectIdPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    const pastedTextArray = pastedText.split("/");

    // if pasted text contains full url of project
    if (
      pastedTextArray.length > 2 &&
      pastedTextArray[pastedTextArray.length - 2] === "project"
    ) {
      setJoinProjectValues((prev) => ({
        ...prev,
        projectId: pastedTextArray[pastedTextArray.length - 1],
      }));
    }

    // to check if pasted text is a projec id
    if (pastedText.length === 36) {
      setJoinProjectValues((prev) => ({
        ...prev,
        projectId: pastedText,
      }));
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Join
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form>
          <DialogHeader>
            <DialogTitle>Join Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-left">
                User Name
              </Label>
              <Input
                id="username"
                placeholder="dev123"
                value={joinProjectValues.username}
                onChange={function (event) {
                  setJoinProjectValues((prev) => ({
                    ...prev,
                    username: event.target.value.toLocaleLowerCase(),
                  }));
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectId" className="text-left">
                Project Id
              </Label>
              <Input
                id="projectId"
                placeholder="paste here..."
                value={joinProjectValues.projectId}
                onPaste={onProjectIdPaste}
                onChange={function (event) {
                  setJoinProjectValues((prev) => ({
                    ...prev,
                    projectId: event.target.value,
                  }));
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Link href={`/project/${joinProjectValues.projectId}`}>
              <Button type="submit" onClick={handleJoinProject}>
                Join
              </Button>
            </Link>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
