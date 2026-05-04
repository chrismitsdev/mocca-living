const songs = [
  {
    artist: 'DJ Golden Feta',
    title: 'Greek artists 2025 Mix',
    src: '/music/welcome-to-greece-mix.mp3'
  },
  {
    artist: 'Chill Story Cafe',
    title: 'Morning coffee',
    src: '/music/morning-coffee.mp3'
  },
  {
    artist: 'Deep Music',
    title: 'Nightborn secrets',
    src: '/music/nightborn-secrets.mp3'
  }
].map((entry, i) => ({trackId: i + 1, ...entry})) as Song[]

export {songs}
