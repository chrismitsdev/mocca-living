'use client'

import {Audio, formatTime} from '@sina_byn/re-audio'
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconPlaylistFilled
} from '@tabler/icons-react'
import Image from 'next/image'
import moccaLogo from '@/public/logos/mocca-logo-simple.svg'
import {playlist} from '@/public/music/playlist'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/src/components/ui/collapsible'
import {IconButton} from '@/src/components/ui/icon-button'
import {Separator} from '@/src/components/ui/separator'
import {Slider} from '@/src/components/ui/slider'
import {Typography} from '@/src/components/ui/typography'

function AudioPlayer() {
  return (
    <Collapsible>
      <Audio playlist={playlist}>
        {({
          trackIndex,
          playing,
          duration,
          currentTime,
          currentTrack,
          togglePlay,
          prevTrack,
          nextTrack,
          setCurrentTime,
          playTrack
        }) => (
          <>
            <div className='py-5 px-4'>
              <div className='w-full space-y-6'>
                {/* Track details */}
                <div className='pe-8 flex items-start gap-x-4'>
                  <Image
                    src={moccaLogo}
                    alt='Mocca logo'
                    className='size-16'
                  />

                  <div className='grow'>
                    <Typography variant='tiny'>
                      {playlist[trackIndex].title ?? '---'}
                    </Typography>
                    <Typography variant='tiny'>
                      {playlist[trackIndex].artist ?? '---'}
                    </Typography>
                  </div>
                </div>
                {/* Track controls & collapsible */}
                <div className='flex justify-between gap-x-4'>
                  <div className='flex w-full items-center gap-x-4'>
                    <IconButton
                      aria-label='Go to previous song'
                      variant='ghost'
                      size='small'
                      onClick={prevTrack}
                    >
                      <IconPlayerTrackPrevFilled />
                    </IconButton>
                    <IconButton
                      aria-label={playing ? 'Pause' : 'Play'}
                      variant='ghost'
                      size='small'
                      onClick={togglePlay}
                    >
                      {playing ? (
                        <IconPlayerPauseFilled />
                      ) : (
                        <IconPlayerPlayFilled />
                      )}
                    </IconButton>
                    <IconButton
                      aria-label='Go to next song'
                      variant='ghost'
                      size='small'
                      onClick={nextTrack}
                    >
                      <IconPlayerTrackNextFilled />
                    </IconButton>
                  </div>
                  <CollapsibleTrigger asChild>
                    <IconButton
                      aria-label='Show playlist'
                      variant='ghost'
                      size='small'
                    >
                      <IconPlaylistFilled />
                    </IconButton>
                  </CollapsibleTrigger>
                </div>
                {/* Song progress bar */}
                <div className='flex items-center'>
                  <Slider
                    value={[currentTime]}
                    onValueChange={(value) => setCurrentTime(value[0])}
                    max={duration}
                  />
                  <Typography
                    className='min-w-16 text-right'
                    variant='small'
                  >
                    {formatTime(currentTime)}
                  </Typography>
                </div>
              </div>
            </div>
            <CollapsibleContent>
              <Separator />
              <ul>
                {playlist.map((track, i) => {
                  return (
                    <PlaylistTrack
                      key={track.id}
                      isActive={currentTrack?.src === track.src}
                      duration={track.duration}
                      onClick={() => playTrack(i)}
                    >
                      {track.title}
                    </PlaylistTrack>
                  )
                })}
              </ul>
            </CollapsibleContent>
          </>
        )}
      </Audio>
    </Collapsible>
  )
}

function PlaylistTrack({
  duration,
  isActive,
  onClick,
  children
}: React.PropsWithChildren<{
  duration: number
  isActive: boolean
  onClick: () => void
}>) {
  return (
    <li>
      <button
        className='p-4 flex justify-between gap-x-4 inline-full text-left cursor-pointer hover:bg-surface-3'
        type='button'
        onClick={onClick}
      >
        <Typography
          className={isActive ? 'font-bold' : ''}
          variant='small'
        >
          {children}
        </Typography>
        <Typography variant='small'>{formatTime(duration)}</Typography>
      </button>
    </li>
  )
}

AudioPlayer.displayName = 'AudioPlayer'
PlaylistTrack.displayName = 'PlaylistTrack'

export {AudioPlayer}
