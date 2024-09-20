import {CornerDownRightIcon} from 'lucide-react'
import {CustomImage} from '@/components/ui/custom-image'
import {Typography} from '@/components/ui/typography'
import {Container} from '@/components/shared/container'
import * as outdoorImages from '#/public/images/outdoor'

type IdealReasonsProps = {
  title: IntlMessages['Pages']['Home']['IdealReasons']['title']
  reasons: IntlMessages['Pages']['Home']['IdealReasons']['reasons']
}

function IdealReasons({title, reasons}: IdealReasonsProps) {
  return (
    <article className='py-24 space-y-6 bg-surface-2'>
      <Container>
        <div className='grid gap-16 sm:grid-cols-2'>
          <div className='sm:hidden'>
            <CustomImage
              className='h-full object-cover rounded shadow'
              src={outdoorImages.OutdoorImage5}
              alt='Hello'
            />
          </div>
          <div className='hidden grid-cols-2 grid-rows-2 gap-2 sm:grid'>
            <div className='col-start-2'>
              <CustomImage
                className='h-full object-cover rounded shadow'
                src={outdoorImages.OutdoorImage5}
                alt='Hello'
              />
            </div>
            <div className='row-start-2'>
              <CustomImage
                className='h-full object-cover rounded shadow'
                src={outdoorImages.OutdoorImage11}
                alt='Hello'
              />
            </div>
          </div>
          <div>
            <Typography
              variant='h3'
              className='pb-3'
            >
              {title}
            </Typography>
            <div className='mt-12 space-y-14'>
              <Reason
                title={reasons.reason1.title}
                description={reasons.reason1.description}
              />
              <Reason
                title={reasons.reason2.title}
                description={reasons.reason2.description}
              />
              <Reason
                title={reasons.reason3.title}
                description={reasons.reason3.description}
              />
              <Reason
                title={reasons.reason4.title}
                description={reasons.reason4.description}
              />
              <Reason
                title={reasons.reason5.title}
                description={reasons.reason5.description}
              />
            </div>
          </div>
        </div>
      </Container>
    </article>
  )
}

function Reason({title, description}: {title: string; description: string}) {
  return (
    <div className='flex gap-2'>
      <CornerDownRightIcon
        className='shrink-0'
        size={24}
      />
      <div className='space-y-2'>
        <Typography variant='large'>{title}</Typography>
        <Typography>{description}</Typography>
      </div>
    </div>
  )
}

IdealReasons.displayName = 'IdealReasons'
Reason.displayName = 'Reason'

export {IdealReasons}
