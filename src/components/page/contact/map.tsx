'use client'

import * as React from 'react'
import {Map as ReactMapGl, Marker, Popup} from 'react-map-gl/mapbox'
import {MapPinIcon, XIcon} from 'lucide-react'
import {useMediaQuery} from '@/hooks/useMediaQuery'
import {Typography} from '@/components/ui/typography'
import {LogoSimple} from '@/components/logos/logo-simple'

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

function Map({token, translations}: MapboxProps) {
  const [showPopup, setShowPopup] = React.useState<boolean>(true)
  const matches = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false
  })

  return (
    <article>
      <ReactMapGl
        style={{
          width: '100%',
          minHeight: matches ? 696 : 500,
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--box-shadow-sm)'
        }}
        mapboxAccessToken={token}
        initialViewState={{
          latitude: coords.lat,
          longitude: coords.lon,
          zoom: 15
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
          onClick={() => setShowPopup((prevState) => !prevState)}
        >
          <MapPinIcon
            className='fill-surface-1 text-primary'
            size={24}
          />
        </Marker>
        {showPopup && (
          <Popup
            className='min-w-52 drop-shadow-md'
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
              className='absolute top-2 right-2 cursor-pointer hover:text-red-9'
              onClick={() => setShowPopup(false)}
            >
              <XIcon size={16} />
            </div>
            <div className='inline-flex items-center gap-4'>
              <LogoSimple
                className='text-primary'
                width={25.5}
                height={40}
              />
              <div className='mr-4'>
                <Typography
                  className='mb-1 font-semibold'
                  variant='small'
                >
                  {translations.title}
                </Typography>
                <Typography
                  variant='small'
                  className='underline'
                  asChild
                >
                  <a
                    href='https://www.google.com/maps?saddr=My+Location&daddr=40.848948,25.723508'
                    target='_blank'
                  >
                    {translations.directions}
                  </a>
                </Typography>
              </div>
            </div>
          </Popup>
        )}
      </ReactMapGl>
    </article>
  )
}

Map.displayName = 'Map'

export {Map}
