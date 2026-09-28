'use client'

import 'leaflet/dist/leaflet.css'
import {Marker} from '@adamscybot/react-leaflet-component-marker'
import {IconMapPinFilled} from '@tabler/icons-react'
import type {LatLngTuple} from 'leaflet'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import {MapContainer, Popup, TileLayer} from 'react-leaflet'
import moccaLogo from '@/public/logos/mocca-logo.svg'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const MAP_CENTER = [40.8481723, 25.8022197] satisfies LatLngTuple

type LocationInfo = {
  coords: LatLngTuple
  label: string
}

const location: Record<PropertyLocation, LocationInfo> = {
  'mocca-by-the-sea': {
    coords: [40.849038, 25.723552],
    label: 'Mocca by the Sea'
  },
  'mocca-city': {
    coords: [40.8473066, 25.8808873],
    label: 'Mocca City'
  }
}

function ContactMap() {
  const t = useTranslations()
  const data = Object.entries(location)

  const renderedMarkers = data.map(([key, {coords, label}]) => {
    return (
      <Marker
        key={key}
        position={coords}
        icon={<IconMapPinFilled className='text-primary' />}
      >
        <Popup
          offset={[0, -8]}
          className='w-56'
        >
          <div className='flex items-start gap-4'>
            <Image
              src={moccaLogo}
              alt='Mocca Living logo'
              width={48}
            />
            <div>
              <Typography
                className='font-bold text-primary'
                variant='small'
              >
                {label}
              </Typography>
              <Typography
                className='underline text-primary'
                variant='small'
                asChild
              >
                <a
                  className='text-inherit!'
                  href={`https://www.google.com/maps?saddr=My+Location&daddr=${coords[0]},${coords[1]}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {t('Pages.contact.map.directions')}
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

export default ContactMap
