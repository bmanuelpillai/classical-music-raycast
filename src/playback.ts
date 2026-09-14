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

export async function playQueue(tracks: Track[]): Promise<void> {
  await stopCurrent();

  const command = tracks
    .map((track) => {
      const filePath = path.join(environment.assetsPath, "audio", track.filename);
      return `afplay "${filePath.replace(/"/g, '\\"')}"`;
    })
    .join(" && ");

  // detached so the shell becomes its own process group leader; killing -pid
  // below then kills the shell and whichever afplay it's currently running.
  const child = spawn("/bin/sh", ["-c", command], { detached: true, stdio: "ignore" });
  child.unref();

  if (child.pid) {
    await LocalStorage.setItem(PID_KEY, child.pid);
  }
}

export async function stopCurrent(): Promise<void> {
  const pid = await LocalStorage.getItem<number>(PID_KEY);
  if (typeof pid === "number") {
    try {
      process.kill(-pid);
    } catch {
      // already stopped, nothing to do
    }
    await LocalStorage.removeItem(PID_KEY);
  }
}
