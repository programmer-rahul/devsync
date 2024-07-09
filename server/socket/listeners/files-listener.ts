import { SocketType } from "../../types/socket";
import { SOCKET_ENUMS } from "../../utils/constants";
import {
  getFoldersAndFilesCount,
  updateFileContentToProject,
} from "../../utils/project-structure-utils";
import { userProjects, userSockets } from "../socket";

const { FILE_CONTENT_CHANGED } = SOCKET_ENUMS;
const { GET_FOLDER_AND_FILE_COUNTS } = SOCKET_ENUMS;

const onFileContentChanged = ({
  socket,
  fileId,
  updatedContent,
}: {
  socket: SocketType;
  fileId: string;
  updatedContent: string;
}) => {
  const currentUser = userSockets[socket.id];
  const projectId = currentUser?.joinedProject;

  if (!fileId || !updatedContent) return;
  if (!projectId) return;

  const structure = userProjects[projectId].structure;

  // update file content in project structure
  const { updatedProject, status } = updateFileContentToProject({
    project: structure,
    fileId: fileId,
    updatedContent: updatedContent,
  });
  if (!status) return;

  // now update project structure in userProjects
  userProjects[projectId].structure = updatedProject;

  // emit event to other user that a file content has been updated
  socket.broadcast.to(projectId).emit(FILE_CONTENT_CHANGED, {
    changedBy: currentUser,
    fileId: fileId,
    updatedContent: updatedContent,
  });
};

const onGetFolderAndFileCounts = ({
  socket,
  projectIds,
}: {
  socket: SocketType;
  projectIds: string[];
}) => {
  if (!projectIds) return;

  let folderFileCounts: {}[] = [];
  projectIds.forEach((projectId) => {
    // check if the project with this projectIds exits or not
    if (!userProjects[projectId]) return;

    // now calculate counts of folders and files
    const { status, count } = getFoldersAndFilesCount(
      userProjects[projectId].structure
    );

    if (!status) return;

    // add them into array
    folderFileCounts.push({ projectId: projectId, count: count });
  });

  // console.log("folderFileCounts", folderFileCounts);

  // give back the counts to user
  socket.emit(GET_FOLDER_AND_FILE_COUNTS, { folderFileCounts });
};

export { onFileContentChanged, onGetFolderAndFileCounts };
