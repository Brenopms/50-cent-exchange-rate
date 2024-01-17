import videoshow from "videoshow";

const saveVideo = (
  images: { path: string; loop: number }[],
  videoOptions: Record<string, unknown>,
  finalVideoPath: string,
  songPath: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    videoshow(images, videoOptions)
      .audio(songPath, { fade: false })
      .save(finalVideoPath)
      .on("start", (command: string) => {
        console.log("encoding " + finalVideoPath + " with command " + command);
      })
      .on("error", (err: string, stdout: unknown, stderr: unknown) => {
        reject(err);
      })
      .on("end", (output: unknown) => {
        resolve(finalVideoPath);
      });
  });
};

export const createVideo = async (
  outputVideoPath: string,
  imagePath: string,
  songPath: string
) => {
  const secondsToShowEachImage = 5;

  // setup videoshow options
  const videoOptions = {
    fps: 30,
    transition: false,
    videoBitrate: 1024,
    videoCodec: "libx264",
    size: "1080x1920",
    outputOptions: ["-pix_fmt yuv420p"],
    format: "mp4",
    audioBitrate: "192k",
    audioChannels: 2,
    disableFadeOut: true,
    disableFadeIn: true,
  };

  const images = [{ path: imagePath, loop: secondsToShowEachImage }];

  const finalCreatedVideoPath = await saveVideo(
    images,
    videoOptions,
    outputVideoPath,
    songPath
  );

  return finalCreatedVideoPath;
};
