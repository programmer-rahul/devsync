import { FaFile, FaJava } from "react-icons/fa";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMarkdown,
  SiPython,
  SiTextpattern,
  SiTypescript,
} from "react-icons/si";

import {PiFileTxtFill} from 'react-icons/pi'


export function getLanguageIcon(iconName: string) {
  const fileExtention = iconName?.split(".").pop();

  const currentIcon = iconsList.find(({ name, Icon }) => {
    if (name === fileExtention) {
      return true;
    }
  });

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
