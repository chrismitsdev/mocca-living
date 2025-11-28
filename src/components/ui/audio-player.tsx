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
import * as React from 'react'
import ReactAudioPlayer, {RHAP_UI} from 'react-h5-audio-player'
import image from '@/public/images/other/playlst-image.jpg'
import {songs} from '@/public/music/playlist'
import {Button} from '@/src/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {CustomImage} from '@/src/components/ui/custom-image'
import {
  ScrollArea,
  ScrollAreaBar,
  ScrollAreaViewport
} from '@/src/components/ui/scrollarea'
import {Separator} from '@/src/components/ui/separator'
import {Spinner} from '@/src/components/ui/spinner'
import {Typography} from '@/src/components/ui/typography'
import {cn, formatDuration} from '@/src/lib/utils'
import {reducer, type State} from '@/src/reducers/audo-player-reducer'

const initialState: State = {
  playlist: songs,
  currentTrackIndex: 0,
  showPlaylist: true,
  isPlaying: false
}

const AudioPlayer: React.FC<
  React.ComponentPropsWithRef<typeof ReactAudioPlayer>
> = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
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
              key={crypto.randomUUID()}
              className='ml-auto sm:ml-4'
              asChild
            >
              <Button
                variant={state.showPlaylist ? 'primary' : 'ghost'}
                size='icon-small'
              >
                <ListMusicIcon />
              </Button>
            </CollapsibleTrigger>
          ]}
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
        <ScrollArea type='always'>
          <ScrollAreaViewport className='max-h-[calc(100dvh-208px-128px-32px)] sm:max-h-[calc(100dvh-280px-32px-300px)]'>
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
          </ScrollAreaViewport>
          <ScrollAreaBar className='w-2 sm:w-2.5' />
        </ScrollArea>
      </CollapsibleContent>
    </Collapsible>
  )
}

const CurrentTrack: React.FC<
  React.ComponentPropsWithRef<'div'> & Song & {isPlaying: boolean}
> = ({artist, title, isPlaying}) => {
  return (
    <div className='sm:mb-0 sm:p-4'>
      <div className='flex items-start gap-2 sm:gap-4'>
        <CustomImage
          className='w-[72px] h-[72px] sm:w-24 sm:h-24 object-cover rounded'
          src={image}
          alt='Playlist image'
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

const Playlist: React.FC<React.ComponentPropsWithRef<'ul'>> = ({
  className,
  ...props
}) => {
  return (
    <ul
      className={cn('px-4 sm:py-4', className)}
      {...props}
    />
  )
}

const PlaylistTrack: React.FC<
  React.HTMLAttributes<HTMLLIElement> & Song & {isActive: boolean}
> = ({
  trackId,
  artist,
  title,
  src,
  duration,
  isActive,
  className,
  ...props
}) => {
  const [trackDuration, setTrackDuration] = React.useState<number | null>(null)

  React.useEffect(() => {
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
        isActive && 'font-semibold',
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
