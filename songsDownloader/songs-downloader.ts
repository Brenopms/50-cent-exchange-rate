import * as topSongsJSON from "./top-songs.json";

const saveSong = async (songName: string, song: ArrayBuffer): Promise<void> => {
  await Bun.write(`./songs/${songName}.mp3`, song);
};

const saveSongsPromises = topSongsJSON.data.map(async (song) => {
  const songResponse = await fetch(song.previewUrl);
  const songArrayBuffer = await songResponse.arrayBuffer();
  await saveSong(song.name, songArrayBuffer);
});

await Promise.all(saveSongsPromises);
