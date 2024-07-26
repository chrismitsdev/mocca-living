'use client'

import * as React from 'react'
import Image from 'next/image'
import Map, {Marker, Popup} from 'react-map-gl'
import {DrawingPinFilledIcon, Cross1Icon} from '@radix-ui/react-icons'
import {Button} from '@/components/ui/button'
import {Typography} from '@/components/ui/typography'
import logoBox from '#/public/logos/mocca-logo-box.svg'
import 'mapbox-gl/dist/mapbox-gl.css'

const coords = {
  lat: 40.849038,
  lon: 25.723552
}

type ContactMapProps = {
  token: string
  translations: {
    title: string
    directions: string
  }
}

function ContactMap({token, translations}: ContactMapProps) {
  const [showPopup, setShowPopup] = React.useState<boolean>(true)

  return (
    <Map
      style={{width: '100%', minHeight: 450}}
      mapboxAccessToken={token}
      initialViewState={{
        latitude: coords.lat,
        longitude: coords.lon,
        zoom: 16,
        pitch: 30
      }}
      mapStyle='mapbox://styles/mapbox/streets-v12'
      renderWorldCopies={false}
      attributionControl={false}
      doubleClickZoom={false}
      reuseMaps
    >
      <Marker 
        className='cursor-pointer'
        latitude={coords.lat} 
        longitude={coords.lon}
        rotation={-45} 
        onClick={() => setShowPopup(prevState => !prevState)}
      >
        <DrawingPinFilledIcon width={24} height={24} />
      </Marker>
      {showPopup && (
        <Popup 
          latitude={coords.lat} 
          longitude={coords.lon} 
          offset={15}
          closeOnClick={false}
          anchor='bottom'
          onClose={() => setShowPopup(false)}
          closeButton={false}
        >
          <Button 
            className='absolute top-1 right-1 focus-visible:ring-offset-0 focus-visible:ring-0'
            variant='ghost-error'
            size='icon-mini'
            onClick={() => setShowPopup(false)}
            type='button'
          >
            <Cross1Icon width={12} height={12} />
          </Button>
          <div className='flex gap-3'>
            <Image height={64} src={logoBox} alt='logo' />
            <div className='mr-4'>
              <Typography className='mb-1 font-semibold' variant='small'>
                {translations.title}
              </Typography>
              <Typography variant='small' className='underline' asChild>
                <a 
                  href='https://www.google.com/maps?saddr=My+Location&daddr=40.849038,25.723552'
                  target='_blank'
                >
                {translations.directions}
                </a>
              </Typography>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  )
}

ContactMap.displayName = 'ContactMap'

export {ContactMap}