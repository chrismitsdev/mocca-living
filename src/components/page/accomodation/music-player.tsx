'use client'

import * as React from 'react'
import AudioPlayer, {RHAP_UI} from 'react-h5-audio-player'
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SlashIcon,
  ListMusicIcon
} from 'lucide-react'
import {cn, formatDuration} from '#/lib/utils'
import {Container} from '@/components/shared/container'
import {Typography} from '@/components/ui/typography'
import {Spinner} from '@/components/ui/spinner'
import {Separator} from '@/components/ui/separator'
import {Button} from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'
import 'react-h5-audio-player/lib/styles.css'

type Song = {
  id: number
  artist: string
  title: string
  src: string
  duration?: number
}

type State = {
  playlist: Song[]
  currentTrackIndex: number
  showPlaylist: boolean
}

type Action =
  | {type: 'GO_PREV_SONG'}
  | {type: 'GO_NEXT_SONG'}
  | {type: 'GO_TO_SONG'; payload: number}
  | {type: 'TOGGLE_PLAYLIST_VISIBLE'}

function reducerFn(state: State, action: Action): State {
  switch (action.type) {
    case 'GO_PREV_SONG':
      return {
        ...state,
        currentTrackIndex:
          state.currentTrackIndex === 0
            ? state.playlist.length - 1
            : state.currentTrackIndex - 1
      }

    case 'GO_NEXT_SONG':
      return {
        ...state,
        currentTrackIndex:
          state.currentTrackIndex + 1 >= state.playlist.length
            ? 0
            : state.currentTrackIndex + 1
      }

    case 'GO_TO_SONG':
      return {
        ...state,
        currentTrackIndex: action.payload - 1
      }

    case 'TOGGLE_PLAYLIST_VISIBLE':
      return {
        ...state,
        showPlaylist: !state.showPlaylist
      }

    default:
      throw new Error('Unknown action type')
  }
}

function MusicPlayer({playlist}: {playlist: Song[]}) {
  const [state, dispatch] = React.useReducer(reducerFn, {
    playlist,
    currentTrackIndex: 0,
    showPlaylist: true
  })

  return (
    <article>
      <Container>
        <section className='bg-surface-2 border border-surface-3 rounded'>
          <Collapsible
            open={state.showPlaylist}
            onOpenChange={() => dispatch({type: 'TOGGLE_PLAYLIST_VISIBLE'})}
          >
            <AudioPlayer
              layout='stacked-reverse'
              showSkipControls
              showJumpControls={false}
              volume={0.5}
              src={state.playlist[state.currentTrackIndex].src}
              onClickPrevious={() => dispatch({type: 'GO_PREV_SONG'})}
              onClickNext={() => dispatch({type: 'GO_NEXT_SONG'})}
              customVolumeControls={[
                <CollapsibleTrigger
                  key={crypto.randomUUID()}
                  asChild
                >
                  <Button
                    variant={state.showPlaylist ? 'primary' : 'ghost-alt'}
                    size='icon-small'
                  >
                    <ListMusicIcon key={crypto.randomUUID()} />
                  </Button>
                </CollapsibleTrigger>
              ]}
              customAdditionalControls={[]}
              customProgressBarSection={[
                RHAP_UI.PROGRESS_BAR,
                RHAP_UI.CURRENT_TIME,
                <SlashIcon
                  key={crypto.randomUUID()}
                  className='mx-1 w-4 h-4'
                />,
                RHAP_UI.DURATION
              ]}
              customIcons={{
                play: (
                  <PlayIcon
                    className='mx-auto w-10 h-10'
                    strokeWidth={1.5}
                  />
                ),
                pause: (
                  <PauseIcon
                    className='mx-auto w-10 h-10'
                    strokeWidth={1.5}
                  />
                ),
                next: <SkipForwardIcon className='mx-auto' />,
                previous: <SkipBackIcon className='mx-auto' />
              }}
            />
            <CollapsibleContent>
              <Separator />
              {playlist.map((song) => (
                <MusicPlayerTrack
                  key={song.id}
                  onClick={() =>
                    dispatch({type: 'GO_TO_SONG', payload: song.id})
                  }
                  {...song}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        </section>
      </Container>
    </article>
  )
}

function MusicPlayerTrack({
  id,
  artist,
  title,
  src,
  duration,
  className,
  onClick
}: Song & {
  className?: string
  onClick: () => void
}) {
  const [trackDuration, setTrackDuration] = React.useState<number | null>(null)

  React.useEffect(
    function () {
      if (typeof window === 'undefined' || duration) return

      const audio = new Audio(src)

      function onMetadataLoaded() {
        setTrackDuration(audio.duration)
      }

      audio.addEventListener('loadedmetadata', onMetadataLoaded)

      return function () {
        audio.removeEventListener('loadedmetadata', onMetadataLoaded)
      }
    },
    [src, duration]
  )

  return (
    <article
      className={cn(
        'p-4 columns-2 cursor-pointer hover:bg-surface-3 duration-375 sm:columns-4',
        className
      )}
      onClick={onClick}
    >
      <Typography
        variant='small'
        className='hidden sm:block'
      >
        {id}
        {'.'}
      </Typography>
      <Typography
        variant='small'
        className='hidden sm:block'
      >
        {artist}
      </Typography>
      <Typography variant='small'>{title}</Typography>
      {!trackDuration ? (
        <Spinner className='ml-auto' />
      ) : (
        <Typography className='text-right'>
          {formatDuration(trackDuration)}
        </Typography>
      )}
    </article>
  )
}

MusicPlayer.displayName = 'MusicPlayer'
MusicPlayerTrack.displayName = 'MusicPlayerTrack'

export {MusicPlayer}
