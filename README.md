# Classical Music Player

A Raycast extension that plays public-domain classical music — shuffled, or picked from a playlist.

## Commands

- **Play Random Classical Track** — shuffles the whole playlist and plays through it continuously.
- **Browse Playlist** — pick a track; it plays and then continues through the rest of the playlist in order.
- **Stop Playing** — stops playback.

## Music

22 recordings (Bach, Beethoven, Chopin, Handel, Mozart, Pachelbel, Schubert) bundled in `assets/audio/`, sourced from [archive.org](https://archive.org)'s Musopen mirror and other explicitly public-domain-licensed items. Each track's source and license are recorded in [`assets/tracks.json`](assets/tracks.json).

## Development

```
npm install
npm run dev   # loads the extension into Raycast for local testing
npm run build # type-checks and produces a distributable build
```

Playback shells out to macOS's built-in `afplay`, so this extension is macOS-only.
