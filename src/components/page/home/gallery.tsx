import {Container} from '@/components/shared/container'
import {
  LightboxProvider,
  LightboxThumbnails,
  LightboxImage,
  Lightbox
} from '@/components/ui/lightbox'
import {Typography} from '@/components/ui/typography'
import * as outdoorImages from '#/public/images/outdoor'

const images = Object.values(outdoorImages).slice(0, 8)

function Gallery() {
  return (
    <Container
      className='space-y-6'
      asChild
    >
      <article>
        <Typography variant='h3'>{'Mocca Living Gallery'}</Typography>
        <LightboxProvider slides={images}>
          <LightboxThumbnails className='gap-2 grid-cols-2 sm:grid-cols-8 sm:grid-rows-8'>
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-1 sm:col-end-3 sm:row-start-1 sm:row-end-3'
              slide={images[0]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 1'
              }}
            />
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-3 sm:col-end-5 sm:row-start-1 sm:row-end-4'
              slide={images[1]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 2'
              }}
            />
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-5 sm:col-end-9 sm:row-start-1 sm:row-end-6'
              slide={images[2]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 3'
              }}
            />
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-1 sm:col-end-3 sm:row-start-3 sm:row-end-9'
              slide={images[3]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 4'
              }}
            />
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-3 sm:col-end-5 sm:row-start-4 sm:row-end-7'
              slide={images[4]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 5'
              }}
            />
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-3 sm:col-end-5 sm:row-start-7 sm:row-end-9'
              slide={images[5]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 6'
              }}
            />
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-5 sm:col-end-6 sm:row-start-6 sm:row-end-9'
              slide={images[6]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 7'
              }}
            />
            <LightboxImage
              className='overflow-hidden rounded shadow sm:col-start-6 sm:col-end-9 sm:row-start-6 sm:row-end-9'
              slide={images[7]}
              imageProps={{
                className: 'object-cover w-full h-full',
                loading: 'lazy',
                alt: 'Gallery image 8'
              }}
            />
          </LightboxThumbnails>
          <Lightbox />
        </LightboxProvider>
      </article>
    </Container>
  )
}

Gallery.displayName = 'Gallery'

export {Gallery}
