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
import { FormEvent, useState } from "react";
import { LocalStorage } from "@/lib/helper";
import { useStore } from "../store/useStore";
import { SOCKET_ENUMS } from "@/lib/constants";
import Link from "next/link";

export default function JoinProjectBtn() {
  const showWelcomeScreen = useStore((state) => state.showWelcomeScreen);
  const setShowWelcomeScreen = useStore((state) => state.setShowWelcomeScreen);
  const socket = useStore((state) => state.socket);

  const [joinProjectValues, setJoinProjectValues] = useState({
    username: "",
    projectId: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      joinProjectValues.username.trim() === "" ||
      joinProjectValues.projectId.trim() === ""
    )
      return;

    console.log("submitted", joinProjectValues);
    setIsDialogOpen(false);

    if (!showWelcomeScreen) {
      LocalStorage.set("isWelcomeScreen", false);
      setShowWelcomeScreen(true);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          Join
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
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
                onChange={(event) =>
                  setJoinProjectValues((prev) => ({
                    ...prev,
                    username: event.target.value.toLocaleLowerCase(),
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
                placeholder="paste here..."
                value={joinProjectValues.projectId}
                onChange={(event) =>
                  setJoinProjectValues((prev) => ({
                    ...prev,
                    projectId: event.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Link href={`/project/${joinProjectValues.projectId}`}>
              <Button type="submit">Join</Button>
            </Link>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
