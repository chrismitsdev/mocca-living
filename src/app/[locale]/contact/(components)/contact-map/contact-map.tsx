'use client'

import 'leaflet/dist/leaflet.css'
import * as React from 'react'
import {MapPinIcon} from 'lucide-react'
import {useTranslations} from 'next-intl'
import L, {type LatLngTuple} from 'leaflet'
import {MapContainer, TileLayer, Popup} from 'react-leaflet'
import {Marker} from '@adamscybot/react-leaflet-component-marker'
import {Section} from '@/src/components/shared/section'
import {Container} from '@/src/components/shared/container'
import {Typography} from '@/src/components/ui/typography'
import {MoccaLogoSimple} from '@/src/components/logos/mocca-logo-simple'

const coords = [40.849038, 25.723552] satisfies LatLngTuple

const ContactMap: React.FC = () => {
  const t = useTranslations('Pages.Contact.Map')

  const handleMarkerRef = React.useCallback(function (marker: L.Marker | null) {
    if (marker) {
      marker.openPopup()
    }
  }, [])

  return (
    <Section>
      <Container className='h-[500px] sm:h-[696px]'>
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
            <Popup offset={[0, -8]}>
              <div className='flex items-center gap-4'>
                <MoccaLogoSimple
                  className='text-primary'
                  width={25.5}
                  height={40}
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
                      className='!text-inherit'
                      href='https://www.google.com/maps?saddr=My+Location&daddr=40.848948,25.723508'
                      target='_blank'
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
