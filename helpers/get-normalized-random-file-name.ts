import { readdir } from "node:fs/promises";

export const getNormalizedRandomFileName = async (folderPath: string) => {
  const fileNames = await readdir(folderPath);
  const randomIndex = Math.floor(Math.random() * fileNames.length);
  return fileNames[randomIndex].replace(/ /g, "\\ ");
};
