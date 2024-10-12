'use client'

import * as React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import {Container} from '@/components/shared/container'
import data from '#/public/music/data.json'
import 'react-h5-audio-player/lib/styles.css'

const playlist = Object.values(data)

function MusicPlayer() {
  const [currentTrack, setTrackIndex] = React.useState(0)

  const handlePrevSong = () => {
    if (currentTrack === 0) return setTrackIndex(0)
    setTrackIndex((currSong) => currSong - 1)
  }

  const handleNextSong = () => {
    if (currentTrack === playlist.length - 1) return
    setTrackIndex((currSong) => currSong + 1)
  }

  const handleEnd = () => {
    console.log('ended')
    setTrackIndex((currentTrack) =>
      currentTrack < playlist.length - 1 ? currentTrack + 1 : 0
    )
  }

  return (
    <article>
      <Container>
        <AudioPlayer
          showSkipControls
          showJumpControls={false}
          customVolumeControls={[]}
          customAdditionalControls={[]}
          volume={1}
          src={playlist[currentTrack].src}
          onClickPrevious={handlePrevSong}
          onClickNext={handleNextSong}
          onEnded={handleEnd}
          onError={() => {
            console.log('play error')
          }}
        />
      </Container>
    </article>
  )
}

MusicPlayer.displayName = 'MusicPlayer'

export {MusicPlayer}
