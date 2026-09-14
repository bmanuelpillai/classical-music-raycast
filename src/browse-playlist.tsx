import { List, ActionPanel, Action, showHUD, popToRoot } from "@raycast/api";
import { playQueue } from "./playback";
import tracks from "../assets/tracks.json";

export default function Command() {
  return (
    <List>
      {tracks.map((track, index) => (
        <List.Item
          key={track.id}
          title={track.title}
          subtitle={track.composer}
          actions={
            <ActionPanel>
              <Action
                title="Play"
                onAction={async () => {
                  // start here, then continue through the rest of the playlist in order
                  const queue = [...tracks.slice(index), ...tracks.slice(0, index)];
                  await playQueue(queue);
                  await showHUD(`Now playing: ${track.title} — ${track.composer}`);
                  await popToRoot();
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
