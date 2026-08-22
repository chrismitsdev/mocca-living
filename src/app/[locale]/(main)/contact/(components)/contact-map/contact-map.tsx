'use client'

import 'leaflet/dist/leaflet.css'
import {Marker} from '@adamscybot/react-leaflet-component-marker'
import {IconMapPinFilled} from '@tabler/icons-react'
import type {LatLngTuple} from 'leaflet'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {MapContainer, Popup, TileLayer} from 'react-leaflet'
import moccaLogoBox from '@/public/logos/mocca-logo-box.svg'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const MOCCA_SEA_COORDS = [40.849038, 25.723552] satisfies LatLngTuple
const MOCCA_CITY_COORDS = [40.8473066, 25.8808873] satisfies LatLngTuple
const MAP_CENTER = [40.8481723, 25.8022197] satisfies LatLngTuple

const coords: Record<PropertyLocation, LatLngTuple> = {
  'mocca-sea': MOCCA_SEA_COORDS,
  'mocca-city': MOCCA_CITY_COORDS
}

function ContactMap() {
  const t = useTranslations()
  const dataCoords = Object.entries(coords) as [PropertyLocation, LatLngTuple][]

  const renderedMarkers = dataCoords.map(([key, position]) => {
    return (
      <Marker
        key={key}
        position={position}
        icon={<IconMapPinFilled className='text-primary' />}
      >
        <Popup
          offset={[0, -8]}
          className='w-48'
        >
          <div className='flex items-start gap-4'>
            <Image
              src={moccaLogoBox}
              alt='Mocca Living logo'
              width={48}
            />
            <div>
              <Typography
                className='font-bold text-primary'
                variant='small'
              >
                {t(`Metadata.accommodation.location.${key}.title`)}
              </Typography>
              <Typography
                className='underline text-primary'
                variant='small'
                asChild
              >
                <a
                  className='text-inherit!'
                  href={`https://www.google.com/maps?saddr=My+Location&daddr=${position[0]},${position[1]}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t('Pages.contact.contact-map.directions')}
                </a>
              </Typography>
            </div>
          </div>
        </Popup>
      </Marker>
    )
  })

  return (
    <Section>
      <Container className='h-125 sm:h-174'>
        <MapContainer
          className='h-full shadow-sm'
          center={MAP_CENTER}
          zoom={11}
          scrollWheelZoom
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {renderedMarkers}
        </MapContainer>
      </Container>
    </Section>
  )
}

ContactMap.displayName = 'ContactMap'

export default ContactMap
