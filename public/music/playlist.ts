import type {AudioTrack} from '@sina_byn/re-audio'

type Track = AudioTrack & {
  artist: string
  title: string
  duration: number
}

export const playlist: Track[] = [
  {
    id: 1,
    src: '/music/welcome-to-greece-mix.mp3',
    artist: 'DJ Golden Feta',
    title: 'Greek artists mix',
    duration: 3590
  },
  {
    id: 2,
    src: '/music/morning-coffee.mp3',
    artist: 'Chill Story Cafe',
    title: 'Morning coffee',
    duration: 4667
  },
  {
    id: 3,
    src: '/music/nightborn-secrets.mp3',
    artist: 'Deep Music',
    title: 'Nightborn secrets',
    duration: 3645
  }
]
