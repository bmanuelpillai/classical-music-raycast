import { showHUD } from "@raycast/api";
import { playTrack } from "./playback";
import tracks from "../assets/tracks.json";

export default async function Command() {
  const track = tracks[Math.floor(Math.random() * tracks.length)];
  await playTrack(track);
  await showHUD(`Now playing: ${track.title} — ${track.composer}`);
}
