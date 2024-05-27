"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
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
    roomName: "",
    roomId: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (
      newProjectValues.username.trim() === "" ||
      newProjectValues.roomName.trim() === ""
    )
      return;

    console.log("submitted", newProjectValues);
    setIsDialogOpen(false);
  };

  // to change roomId every time when opening dialog box
  useEffect(() => {
    if (isDialogOpen) {
      setNewProjectValues({
        username: "",
        roomName: "",
        roomId: uuidv4(),
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
                value={newProjectValues.username}
                onChange={(event) =>
                  setNewProjectValues((prev) => ({
                    ...prev,
                    username: event.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomname" className="text-left">
                Room Name
              </Label>
              <Input
                id="roomname"
                value={newProjectValues.roomName}
                onChange={(event) =>
                  setNewProjectValues((prev) => ({
                    ...prev,
                    roomName: event.target.value,
                  }))
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="roomid" className="text-left">
                Room Id
              </Label>
              <Input
                id="roomid"
                value={newProjectValues.roomId}
                onChange={(event) =>
                  setNewProjectValues((prev) => ({
                    ...prev,
                    roomId: event.target.value,
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
