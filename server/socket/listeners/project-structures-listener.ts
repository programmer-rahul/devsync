import { File } from "../../types/project";
import { SocketType } from "../../types/socket";
import { SOCKET_ENUMS } from "../../utils/constants";
import {
  addItemToProject,
  deleteItemToProject,
  renameItemToProject,
} from "../../utils/project-structure-utils";
import { userProjects, userSockets } from "../socket";

const { PROJECT_ITEM_CREATED, PROJECT_ITEM_DELETED, PROJECT_ITEM_RENAMED } =
  SOCKET_ENUMS;

// structure
const onProjectItemCreated = ({
  socket,
  newItem,
  folderId,
}: {
  socket: SocketType;
  newItem: File;
  folderId: string;
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!newItem || !projectId) return;

  const structure = userProjects[projectId].structure;

  // add item in project structure
  const { updatedProject, status } = addItemToProject(
    structure,
    folderId,
    newItem.type,
    newItem
  );
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a new items created
  socket.broadcast.to(projectId).emit(PROJECT_ITEM_CREATED, {
    createdBy: currentUser,
    newItem,
    folderId,
  });
};

const onProjectItemDeleted = ({
  socket,
  itemId,
  itemType,
}: {
  socket: SocketType;
  itemId: string;
  itemType: "file" | "folder";
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!itemId || !itemType || !projectId) return;

  const structure = userProjects[projectId].structure;

  // delete item in project structure
  const { updatedProject, status } = deleteItemToProject(
    structure,
    itemId,
    itemType
  );
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a item deleted
  socket.broadcast.to(projectId).emit(PROJECT_ITEM_DELETED, {
    deletedBy: currentUser,
    itemId,
    itemType,
  });

  console.log(projectId);
};

const onProjectItemRenamed = ({
  socket,
  itemId,
  itemType,
  newName,
}: {
  socket: SocketType;
  itemId: string;
  itemType: "file" | "folder";
  newName: string;
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!itemId || !itemType || !newName || !projectId) return;

  const structure = userProjects[projectId].structure;

  // rename item in project structure
  const { updatedProject, status } = renameItemToProject(
    structure,
    itemId,
    itemType,
    newName
  );
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a item renamed
  socket.broadcast.to(projectId).emit(PROJECT_ITEM_RENAMED, {
    renamedBy: currentUser,
    itemId,
    itemType,
    newName,
  });

  console.log(projectId);
};

export { onProjectItemCreated, onProjectItemDeleted, onProjectItemRenamed };
