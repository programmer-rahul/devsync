import { FaFile, FaJava } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMarkdown,
  SiPython,
  SiTypescript,
} from "react-icons/si";

import { PiFileTxtFill } from "react-icons/pi";
import { getFileExtention } from "../utils";

export function getLanguageIcon(fileName: string) {
  const fileExtention = getFileExtention(fileName);

  const currentIcon = iconsList.find(({ name }) => name === fileExtention);

  return currentIcon ? currentIcon.Icon : FaFile;
}

const iconsList = [
  {
    name: "html",
    Icon: SiHtml5,
  },
  {
    name: "css",
    Icon: SiCss3,
  },
  {
    name: "js",
    Icon: SiJavascript,
  },
  {
    name: "md",
    Icon: SiMarkdown,
  },
  {
    name: "py",
    Icon: SiPython,
  },
  {
    name: "txt",
    Icon: PiFileTxtFill,
  },
  {
    name: "ts",
    Icon: SiTypescript,
  },
  {
    name: "java",
    Icon: FaJava,
  },
];
