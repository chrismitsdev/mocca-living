const playlist = [
  {
    artist: 'FASSounds',
    title: 'Calm',
    src: '/music/calm.mp3'
  },
  {
    artist: 'FASSounds',
    title: 'Daily coffee',
    src: '/music/daily-coffee.mp3'
  },
  {
    artist: 'FASSounds',
    title: 'Good night',
    src: '/music/good-night.mp3'
  },
  {
    artist: 'FASSounds',
    title: 'Satisfying',
    src: '/music/satisfying.mp3'
  },
  {
    artist: 'FASSounds',
    title: 'Tasty',
    src: '/music/tasty.mp3'
  },
  {
    artist: 'Lofium',
    title: 'Backyard',
    src: '/music/backyard.mp3'
  },
  {
    artist: 'Lofium',
    title: 'Memories',
    src: '/music/memories.mp3'
  },
  {
    artist: 'Lofium',
    title: 'Jinsei',
    src: '/music/jinsei.mp3'
  },
  {
    artist: 'Lofium',
    title: 'Toybox',
    src: '/music/toybox.mp3'
  },
  {
    artist: 'Pumpupthemind',
    title: 'Chill lofi',
    src: '/music/chill-lofi.mp3'
  },
  {
    artist: 'Saavane',
    title: '21 months',
    src: '/music/21-months.mp3'
  },
  {
    artist: 'Watrfallkero',
    title: 'Lofi beat',
    src: '/music/lofi-beat.mp3'
  },

  {
    artist: 'Vital',
    title: 'Soft Vibes',
    src: '/music/soft-vibes.mp3'
  },
  {
    artist: 'Tvari',
    title: 'Tokyo Café',
    src: '/music/tokyo-cafe.mp3'
  },
  {
    artist: 'Lunar Years',
    title: 'Cozy Coffeehouse',
    src: '/music/cozy-coffeehouse.mp3'
  }
].map((entry, i) => ({id: i + 1, ...entry})) as Song[]

export {playlist}
