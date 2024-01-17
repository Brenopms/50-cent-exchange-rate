import { getExchangeRate } from "./exchangeRate/exchange-rate";
import { getNormalizedRandomFileName } from "./helpers/get-normalized-random-file-name";
import { generateImage } from "./imageLoader/image-loader";
import { createVideo } from "./videoLoader/video-loader";

export const FROM_CURRENCY = "USD" as const;
export const TO_CURRENCY = "BRL" as const;

const exchangeRate = await getExchangeRate();

const timeString = new Date().toISOString();
const outputImagePath = `output/50-cent${timeString}-thumb.png`;
const outputVideoPath = `output/50-cent${timeString}.mp4`;

const songName = await getNormalizedRandomFileName("./songs");
const songPath = `./songs/${songName}`;

const editedImage = await generateImage(
  (exchangeRate.bid / 2)?.toFixed(2), // 50 Cent MAGIC!
  "./images"
);

// Write image to be used in the video
await Bun.write(outputImagePath, editedImage);

// Write Video with the created image and selected song
await createVideo(outputVideoPath, outputImagePath, songPath);
