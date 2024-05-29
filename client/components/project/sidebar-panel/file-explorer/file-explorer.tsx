import { ProjectStructure } from "@/app/components/types/explorer";
import ExplorerFolder from "../../code-editor/explorer-folder";

export default function FileExplorer() {
  const projectStructure: ProjectStructure = {
    id: ":root",
    name: "root",
    type: "folder",
    files: [
      {
        id: "index.js",
        name: "index.js",
        type: "file",
        content: "*****",
      },
    ],
    subFolders: [
      {
        id: "src",
        name: "src",
        type: "folder",
        files: [
          {
            id: "index-1.js",
            name: "index.js",
            type: "file",
            content: "?????",
          },
        ],
        subFolders: [
          {
            id: "utils",
            name: "utils",
            type: "folder",
            files: [
              {
                id: "constants.js",
                name: "constants.js",
                type: "file",
                content: "?????",
              },
            ],
          },
          {
            id: "hooks",
            name: "hooks",
            type: "folder",
            files: [
              {
                id: "useSocket.js",
                name: "useSocket.js",
                type: "file",
                content: "?????",
              },
              {
                id: "useAxios.js",
                name: "useAxios.js",
                type: "file",
                content: "?????",
              },
            ],
          },
        ],
      },
      {
        id: "components",
        name: "components",
        type: "folder",
        files: [
          {
            id: "homePage.js",
            name: "homePage.js",
            type: "file",
            content: "?????",
          },
        ],
      },
    ],
  };

  console.log("project structure :- ", projectStructure);

  return (
    <div>
      <ExplorerFolder
        key={projectStructure.id}
        id={projectStructure.id}
        name={projectStructure.name}
        files={projectStructure.files}
        subFolders={projectStructure.subFolders}
        type={projectStructure.type}
      />
    </div>
  );
}
