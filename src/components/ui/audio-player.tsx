'use client'

import * as React from 'react'
import ReactAudioPlayer, {RHAP_UI} from 'react-h5-audio-player'
import {
  PlayIcon,
  PauseIcon,
  SkipBackIcon,
  SkipForwardIcon,
  SlashIcon,
  ListMusicIcon,
  UserIcon,
  MusicIcon,
  ListIcon,
  Volume2Icon,
  VolumeOffIcon
} from 'lucide-react'
import {cn, formatDuration} from '#/lib/utils'
import {reducer} from '@/reducers/audo-player-reducer'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible'
import {Typography} from '@/components/ui/typography'
import {Spinner} from '@/components/ui/spinner'
import {Separator} from '@/components/ui/separator'
import {Button} from '@/components/ui/button'
import {CustomImage} from '@/components/ui/custom-image'
import {TextEffect} from '@/components/motion/text-effect'
import {
  ScrollArea,
  ScrollAreaViewport,
  ScrollAreaBar
} from '@/components/ui/scrollarea'
import image from '#/public/images/other/playlst-image.jpg'
import '@/custom-styles/audio-player.css'

type AudioPlayerProps = React.ComponentPropsWithoutRef<
  typeof ReactAudioPlayer
> & {
  playlist: Song[]
}

type CurretntTrackProps = Song & {isPlaying: boolean}

type PlaylistProps = React.HTMLAttributes<HTMLUListElement>

type PlaylistTrackProps = Omit<React.HTMLAttributes<HTMLLIElement>, 'id'> &
  Song & {isActive: boolean}

function AudioPlayer({playlist, ...props}: AudioPlayerProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    playlist,
    currentTrackIndex: 0,
    showPlaylist: true,
    isPlaying: false
  })
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
          <ScrollAreaViewport className='max-h-[calc(100svh-208px-128px-32px)] sm:max-h-[calc(100vh-280px-32px-300px)]'>
            {/* <ScrollAreaViewport className='max-h-[calc(100vh-208px-32px)] sm:max-h-[calc(100vh-280px-32px-300px)]'> */}
            <Playlist>
              {playlist.map((song) => (
                <PlaylistTrack
                  key={song.id}
                  isActive={currentTrack.id === song.id}
                  onClick={() =>
                    dispatch({type: 'GO_TO_SONG', payload: song.id})
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

function CurrentTrack({artist, title, isPlaying}: CurretntTrackProps) {
  return (
    <div className='sm:mb-0 sm:p-4'>
      <div className='flex items-start gap-4'>
        <CustomImage
          className='w-16 h-16 sm:w-24 sm:h-24 object-cover rounded'
          src={image}
          alt='Playlist image'
        />
        <div className='space-y-2'>
          <div className='flex gap-2'>
            <MusicIcon className='mt-1 w-4 h-4' />
            {isPlaying ? (
              <TextEffect
                className='text-base font-semibold sm:text-lg'
                preset='fade'
              >
                {title}
              </TextEffect>
            ) : (
              <Typography
                variant='large'
                className='text-base sm:text-lg'
              >
                {'---'}
              </Typography>
            )}
          </div>
          <div className='flex gap-2'>
            <UserIcon className='mt-1 w-4 h-4' />
            <Typography variant='small'>
              {isPlaying ? artist : '----'}
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

function Playlist({className, ...props}: PlaylistProps) {
  return (
    <ul
      className={cn('px-4 sm:py-4', className)}
      {...props}
    />
  )
}

function PlaylistTrack({
  id,
  artist,
  title,
  src,
  duration,
  isActive,
  className,
  ...props
}: PlaylistTrackProps) {
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
    <li
      className={cn(
        'py-4 grid grid-cols-2 items-center gap-2 cursor-pointer duration-375 hover:bg-surface-3 sm:grid-cols-[24px,repeat(3,1fr)] sm:p-4',
        isActive && 'font-semibold',
        className
      )}
      {...props}
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
