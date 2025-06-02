const songs = [
  {
    artist: 'Chill Story Cafe',
    title: 'Morning coffee',
    src: '/music/morning-coffee-playlist.mp3'
  },
  {
    artist: 'Deep Music',
    title: 'Nightborn secrets',
    src: '/music/nightborn-secrets-playlist.mp3'
  }
].map((entry, i) => ({trackId: i + 1, ...entry})) as Song[]

export {songs}
