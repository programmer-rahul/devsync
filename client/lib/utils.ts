import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { FILE_ICONS } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMessageDate = (date: Date, formatStr: string = "p") => {
  return format(date, formatStr);
};

export const getFileIcon = (fileName: string) => {
  const fileExtention = fileName.split(".").pop();
  let fileIcon = "/files/default-file.svg";

  if (fileExtention && FILE_ICONS[fileExtention]) {
    fileIcon = FILE_ICONS[fileExtention];
  }
  return fileIcon;
};
