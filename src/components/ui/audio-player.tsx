'use client'

import {
  ListIcon,
  ListMusicIcon,
  MusicIcon,
  PauseIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SlashIcon,
  UserIcon,
  Volume2Icon,
  VolumeOffIcon
} from 'lucide-react'
import {useEffect, useReducer, useState} from 'react'
import ReactAudioPlayer, {RHAP_UI} from 'react-h5-audio-player'
import image from '@/public/images/other/playlst-image.jpg'
import {songs} from '@/public/music/playlist'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {CustomImage} from '@/src/components/ui/custom-image'
import {IconButton} from '@/src/components/ui/icon-button'
import {
  Scrollarea,
  ScrollareaBar,
  ScrollareaViewport
} from '@/src/components/ui/scrollarea'
import {Separator} from '@/src/components/ui/separator'
import {Spinner} from '@/src/components/ui/spinner'
import {Typography} from '@/src/components/ui/typography'
import {cn} from '@/src/lib/utils'
import {reducer, type State} from '@/src/reducers/audo-player-reducer'

const initialState: State = {
  playlist: songs,
  currentTrackIndex: 0,
  showPlaylist: true,
  isPlaying: false
}

function AudioPlayer(
  props: React.ComponentPropsWithRef<typeof ReactAudioPlayer>
) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const currentTrack = state.playlist[state.currentTrackIndex]

  return (
    <Collapsible
      open={state.showPlaylist}
      onOpenChange={() => dispatch({type: 'TOGGLE_PLAYLIST_VISIBLE'})}
    >
      <div className='p-4 space-y-4 sm:space-y-0'>
        <CurrentTrack
          isPlaying={state.isPlaying}
          {...currentTrack}
        />
        <ReactAudioPlayer
          layout='stacked-reverse'
          showSkipControls
          showJumpControls={false}
          volume={0.5}
          src={currentTrack.src}
          onClickPrevious={() => dispatch({type: 'GO_PREV_SONG'})}
          onClickNext={() => dispatch({type: 'GO_NEXT_SONG'})}
          onEnded={() => dispatch({type: 'GO_NEXT_SONG'})}
          onPlay={() => dispatch({type: 'IS_PLAYING', payload: true})}
          onPause={() => dispatch({type: 'IS_PLAYING', payload: false})}
          onError={() => dispatch({type: 'IS_PLAYING', payload: false})}
          onPlayError={() => dispatch({type: 'IS_PLAYING', payload: false})}
          customControlsSection={[
            RHAP_UI.MAIN_CONTROLS,
            RHAP_UI.VOLUME,
            <CollapsibleTrigger
              key={9998}
              aria-label={
                state.showPlaylist ? 'Close playlist' : 'Open playlist'
              }
              className='ml-auto sm:ml-4'
              asChild
            >
              <IconButton
                aria-label='List music tracks'
                variant={state.showPlaylist ? 'primary' : 'ghost'}
              >
                <ListMusicIcon />
              </IconButton>
            </CollapsibleTrigger>
          ]}
          customProgressBarSection={[
            RHAP_UI.PROGRESS_BAR,
            RHAP_UI.CURRENT_TIME,
            <SlashIcon
              key={9999}
              className='mx-1 w-3 h-3'
            />,
            RHAP_UI.DURATION
          ]}
          customIcons={{
            play: <PlayIcon className='sm:w-10 sm:h-10' />,
            pause: <PauseIcon className='sm:w-10 sm:h-10' />,
            next: <SkipForwardIcon />,
            previous: <SkipBackIcon />,
            volume: <Volume2Icon />,
            volumeMute: <VolumeOffIcon />
          }}
          {...props}
        />
      </div>
      <Separator className={cn('hidden', state.showPlaylist && 'block')} />
      <CollapsibleContent>
        <Scrollarea type='always'>
          <ScrollareaViewport className='max-h-[calc(100dvh-208px-128px-32px)] sm:max-h-[calc(100dvh-280px-32px-300px)]'>
            <Playlist>
              {state.playlist.map((song) => (
                <PlaylistTrack
                  key={song.trackId}
                  isActive={currentTrack.trackId === song.trackId}
                  onClick={() =>
                    dispatch({type: 'GO_TO_SONG', payload: song.trackId})
                  }
                  {...song}
                />
              ))}
            </Playlist>
          </ScrollareaViewport>
          <ScrollareaBar className='w-2 sm:w-2.5' />
        </Scrollarea>
      </CollapsibleContent>
    </Collapsible>
  )
}

function CurrentTrack({
  artist,
  title,
  isPlaying
}: React.ComponentPropsWithRef<'div'> & Song & {isPlaying: boolean}) {
  return (
    <div className='sm:mb-0 sm:p-4'>
      <div className='flex items-start gap-2 sm:gap-4'>
        <CustomImage
          className='size-18 sm:size-24 object-cover'
          src={image}
          alt='Tall palm trees against a clear blue sky, viewed from below'
        />
        <div className='sm:space-y-3'>
          <div className='flex gap-2'>
            <MusicIcon className='mt-1 w-4 h-4' />
            {isPlaying ? title : '---'}
          </div>
          <div className='flex gap-2'>
            <UserIcon className='mt-1 w-4 h-4' />
            <Typography variant='small'>
              {isPlaying ? artist : '---'}
            </Typography>
          </div>
          <div className='flex gap-2'>
            <ListIcon className='mt-1 w-4 h-4' />
            <Typography variant='small'>{'Mocca Living playlist'}</Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

function Playlist({className, ...props}: React.ComponentPropsWithRef<'ul'>) {
  return (
    <ul
      className={cn('px-4 sm:py-4', className)}
      {...props}
    />
  )
}

function PlaylistTrack({
  trackId,
  artist,
  title,
  src,
  duration,
  isActive,
  className,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & Song & {isActive: boolean}) {
  const [trackDuration, setTrackDuration] = useState<number | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || duration) return

    const audio = new Audio(src)

    function onMetadataLoaded() {
      setTrackDuration(audio.duration)
    }

    audio.addEventListener('loadedmetadata', onMetadataLoaded)
    return () => {
      audio.removeEventListener('loadedmetadata', onMetadataLoaded)
    }
  }, [src, duration])

  return (
    <li
      className={cn(
        'py-4 grid grid-cols-2 items-center gap-2 cursor-pointer duration-375 hover:bg-surface-3 sm:grid-cols-[24px_repeat(3,1fr)] sm:p-4',
        isActive && 'font-bold',
        className
      )}
      {...props}
    >
      <Typography
        variant='small'
        className='hidden sm:block'
      >
        {trackId}
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
        <Typography
          variant='small'
          className='text-right'
        >
          {formatDuration(trackDuration)}
        </Typography>
      )}
    </li>
  )
}

AudioPlayer.displayName = 'AudioPlayer'
CurrentTrack.displayName = 'CurrentTrack'
Playlist.displayName = 'Playlist'
PlaylistTrack.displayName = 'PlaylistTrack'

export {AudioPlayer}

function formatDuration(durationInSeconds: number | null) {
  if (durationInSeconds === null) return null

  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = Math.floor(durationInSeconds % 60)
    .toString()
    .padStart(2, '0')

  return `${minutes}:${seconds}`
}
