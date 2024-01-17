import { readdir } from "node:fs/promises";
import sharp from "sharp";

import { getNormalizedRandomFileName } from "../helpers/get-normalized-random-file-name";

const getRandomImage = async (
  imagesFolderPath: string
): Promise<ArrayBuffer> => {
  const imageName = await getNormalizedRandomFileName(imagesFolderPath);
  const image = Bun.file(`${imagesFolderPath}/${imageName}`).arrayBuffer();
  return image;
};

export const generateImage = async (
  text: string,
  imagesFolderPath: string
): Promise<Buffer> => {
  const image = await getRandomImage(imagesFolderPath);

  const textImageOverlay = await sharp({
    text: {
      text: `<span bgalpha="1%" background="#f5279100" color="white"><b>${text}</b></span>`,
      font: "sans",
      dpi: 2750,
      align: "center",
      justify: true,
      rgba: true,
    },
  })
    .png()
    .toBuffer();

  const editedImage = await sharp(image)
    .resize(1080, 1920) // tiktok best size
    .composite([{ input: textImageOverlay }])
    .png()
    .toBuffer();

  return editedImage;
};
