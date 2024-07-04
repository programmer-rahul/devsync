import { Project as ProjectInterface } from "@/app/components/types/project";
import { ProjectStructure } from "../../explorer";

export type ProjectSlice = {
  // user projects
  userCreatedProjectsList: ProjectInterface[];
  userJoinedProjectsList: ProjectInterface[];

  addProjectinCreatedProjectsList: (newProject: ProjectInterface) => void;
  addProjectinJoinedProjectsList: (newProject: ProjectInterface) => void;

  removeProjectinCreatedProjectsList: (projectId: string) => void;
  removeProjectinJoinedProjectsList: (projectId: string) => void;

  projectStructure: ProjectStructure;
  updateProjectStructure: (updatedProjectStructure: ProjectStructure) => void;

  creatingProjectItem: { status: boolean; type: "file" | "folder" };
  updateCreatingProjectItem: (status: boolean, type: "file" | "folder") => void;

  projectClientsList: { username: string; socketId: string }[];
  updateProjectClientsList: (
    updatedList: { username: string; socketId: string }[],
  ) => void;
};
