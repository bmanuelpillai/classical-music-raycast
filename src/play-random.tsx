import { showHUD } from "@raycast/api";
import { playQueue, Track } from "./playback";
import tracks from "../assets/tracks.json";

function shuffle(list: Track[]): Track[] {
  const result = [...list];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default async function Command() {
  const queue = shuffle(tracks);
  await playQueue(queue);
  await showHUD(`Now playing: ${queue[0].title} — ${queue[0].composer} (shuffled)`);
}
