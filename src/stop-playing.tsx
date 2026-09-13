import { showHUD } from "@raycast/api";
import { stopCurrent } from "./playback";

export default async function Command() {
  await stopCurrent();
  await showHUD("Stopped");
}
