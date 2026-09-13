import { List, ActionPanel, Action, showHUD, popToRoot } from "@raycast/api";
import { playTrack } from "./playback";
import tracks from "../assets/tracks.json";

export default function Command() {
  return (
    <List>
      {tracks.map((track) => (
        <List.Item
          key={track.id}
          title={track.title}
          subtitle={track.composer}
          actions={
            <ActionPanel>
              <Action
                title="Play"
                onAction={async () => {
                  await playTrack(track);
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
