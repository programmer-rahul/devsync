import {
  Project as ProjectInterface,
} from "@/app/components/types/project";
import { ProjectStructure } from "../../explorer";

export type ProjectSlice = {
  projectIds: { id: string; isCreated: boolean }[];
  addProjectId: ({ id, isCreated }: { id: string; isCreated: boolean }) => void;
  removeProjectId: ({ id }: { id: string }) => void;

  initialProjects: ProjectInterface[];
  addProjectinProjects: (newProject: ProjectInterface) => void;
  removeProjectInProjects: ({ projectId }: { projectId: string }) => void;
  updateInitialProjects: (updateProjects: ProjectInterface[]) => void;

  projectStructure: ProjectStructure;
  updateProjectStructure: (updatedProjectStructure: ProjectStructure) => void;

  creatingProjectItem: { status: boolean; type: "file" | "folder" };
  updateCreatingProjectItem: (status: boolean, type: "file" | "folder") => void;

  projectClientsList: { username: string; socketId: string }[];
  updateProjectClientsList: (
    updatedList: { username: string; socketId: string }[],
  ) => void;

  // user projects
  userCreatedProjectsList: ProjectInterface[];
  userJoinedProjectsList: ProjectInterface[];

  addProjectinCreatedProjectsList: (newProject: ProjectInterface) => void;
  addProjectinJoinedProjectsList: (newProject: ProjectInterface) => void;

  removeProjectinCreatedProjectsList: (projectId: string) => void;
  removeProjectinJoinedProjectsList: (projectId: string) => void;
};
