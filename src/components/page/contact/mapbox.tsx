'use client'

import * as React from 'react'
import Image from 'next/image'
import Map, {Marker, Popup} from 'react-map-gl'
import {DrawingPinFilledIcon, CrossCircledIcon} from '@radix-ui/react-icons'
import {Typography} from '@/components/ui/typography'
import logoBox from '#/public/logos/mocca-logo-box.svg'
import {useMediaQuery} from '@/hooks/useMediaQuery'
import 'mapbox-gl/dist/mapbox-gl.css'

type MapboxProps = {
  token: string
  translations: {
    title: string
    directions: string
  }
}

const coords = {
  lat: 40.849038,
  lon: 25.723552
}

function Mapbox({token, translations}: MapboxProps) {
  const [showPopup, setShowPopup] = React.useState<boolean>(true)
  const matches = useMediaQuery('(min-width: 640px)')

  return (
    <article className='py-12'>
      <div className='p-4 bg-surface-2 rounded shadow-medium'>
        <Typography variant='large' className='mb-4'>
          {'Mocca Living location'}
        </Typography>
        <Map
          style={{width: '100%', minHeight: 450, borderRadius: 'var(--radius)'}}
          mapboxAccessToken={token}
          initialViewState={{
            latitude: coords.lat,
            longitude: coords.lon,
            zoom: 14
          }}
          projection={{name: 'globe'}}
          mapStyle='mapbox://styles/mapbox/streets-v12'
          renderWorldCopies={false}
          attributionControl={false}
          doubleClickZoom={false}
          dragPan={matches}
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
              closeButton={false}
              focusAfterOpen={false}
              onClose={() => setShowPopup(false)}
            >
              <div 
                className='absolute top-1 right-1 cursor-pointer'
                onClick={() => setShowPopup(false)}
              >
                <CrossCircledIcon width={16} height={16} />
              </div>
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
      </div>
    </article>
  )
}

Mapbox.displayName = 'Mapbox'

export {Mapbox}