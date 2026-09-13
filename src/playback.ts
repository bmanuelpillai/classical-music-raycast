import { spawn } from "child_process";
import { environment, LocalStorage } from "@raycast/api";
import path from "path";

const PID_KEY = "current-afplay-pid";

export interface Track {
  id: string;
  title: string;
  composer: string;
  filename: string;
  sourceUrl: string;
  license: string;
}

export async function playTrack(track: Track): Promise<void> {
  await stopCurrent();

  const filePath = path.join(environment.assetsPath, "audio", track.filename);
  const child = spawn("afplay", [filePath], { detached: true, stdio: "ignore" });
  child.unref();

  if (child.pid) {
    await LocalStorage.setItem(PID_KEY, child.pid);
  }
}

async function stopCurrent(): Promise<void> {
  const pid = await LocalStorage.getItem<number>(PID_KEY);
  if (typeof pid === "number") {
    try {
      process.kill(pid);
    } catch {
      // already stopped, nothing to do
    }
  }
}
