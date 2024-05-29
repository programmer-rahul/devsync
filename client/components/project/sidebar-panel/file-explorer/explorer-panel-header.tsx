import { useStore } from "@/components/store/useStore";
import { addItemToProject } from "@/lib/project-structure-utils";

export default function ExplorerPanelHeader() {
  const selectedFolderId = useStore((state) => state.selectedFolderId);
  const projectStructure = useStore((state) => state.projectStructure);
  const updateProjectStructure = useStore(
    (state) => state.updateProjectStructure,
  );

  const createFileHandler = () => {
    const { status, updatedProject } = addItemToProject(
      projectStructure,
      selectedFolderId,
      "file",
      {
        id: (Math.random() * 1000).toString(36),
        name: (Math.random() * 1000).toString(36),
        type: "file",
        content: "iiiiiiikdfkdk",
      },
    );

    status && updateProjectStructure(updatedProject);
  };

  const createFolderHandler = () => {
    const { status, updatedProject } = addItemToProject(
      projectStructure,
      selectedFolderId,
      "folder",
      {
        id: (Math.random() * 1000).toString(36),
        name: (Math.random() * 1000).toString(36),
        type: "folder",
        files: [],
        subFolders: [],
      },
    );

    status && updateProjectStructure(updatedProject);
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Project Name</h2>
      <div className="flex gap-2">
        <div
          className="w-8 cursor-pointer rounded-md bg-primary p-2 text-secondary transition-all hover:bg-primary/70"
          onClick={createFileHandler}
        >
          {addFileSvg}
        </div>
        <div
          className="w-8 cursor-pointer rounded-md bg-primary p-2 text-secondary transition-all hover:bg-primary/70"
          onClick={createFolderHandler}
        >
          {addFolderSvg}
        </div>
        <div className="w-8 cursor-pointer rounded-md bg-destructive p-2 text-destructive-foreground transition-all hover:bg-destructive/80">
          {deleteSvg}
        </div>
      </div>
    </div>
  );
}

const deleteSvg = (
  <svg
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
  >
    <g id="SVGRepo_iconCarrier">
      <path
        fill="currentColor"
        d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"
      ></path>
    </g>
  </svg>
);

const addFolderSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M12 11V15M14 13H10M5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H12.3284C11.798 7 11.2893 6.78929 10.9142 6.41421L10.0858 5.58579C9.71071 5.21071 9.20201 5 8.67157 5L5 5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);

const addFileSvg = (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <path
        d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        d="M17 15V18M17 21V18M17 18H14M17 18H20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </g>
  </svg>
);
