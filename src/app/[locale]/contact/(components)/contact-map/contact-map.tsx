'use client'

import 'leaflet/dist/leaflet.css'
import {Marker} from '@adamscybot/react-leaflet-component-marker'
import type L from 'leaflet'
import type {LatLngTuple} from 'leaflet'
import {MapPinIcon} from 'lucide-react'
import Image from 'next/image'
import {useTranslations} from 'next-intl'
import * as React from 'react'
import {MapContainer, Popup, TileLayer} from 'react-leaflet'
import moccaLogoBox from '@/public/logos/mocca-logo-box.svg'
import {Container} from '@/src/components/shared/container'
import {Section} from '@/src/components/shared/section'
import {Typography} from '@/src/components/ui/typography'

const coords = [40.849038, 25.723552] satisfies LatLngTuple

const ContactMap: React.FC = () => {
  const t = useTranslations('Pages.Contact.Map')

  const handleMarkerRef = React.useCallback((marker: L.Marker | null) => {
    if (marker) {
      marker.openPopup()
    }
  }, [])

  return (
    <Section>
      <Container className='h-125 sm:h-174'>
        <MapContainer
          className='h-full rounded shadow-small'
          center={coords}
          zoom={17}
          scrollWheelZoom
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          <Marker
            position={coords}
            ref={handleMarkerRef}
            icon={
              <MapPinIcon
                size={32}
                className='fill-primary text-surface-1'
              />
            }
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
                    className='font-semibold text-primary'
                    variant='small'
                  >
                    {t('title')}
                  </Typography>
                  <Typography
                    className='underline text-primary'
                    variant='small'
                    asChild
                  >
                    <a
                      className='text-inherit!'
                      href='https://www.google.com/maps?saddr=My+Location&daddr=40.848948,25.723508'
                      target='_blank'
                      rel='noopener'
                    >
                      {t('directions')}
                    </a>
                  </Typography>
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </Container>
    </Section>
  )
}

ContactMap.displayName = 'ContactMap'

export default ContactMap
