import {Link} from '@/navigation'
import {Button} from '@/components/ui/button'
import {ChevronLeft, ChevronRight} from 'lucide-react'

type VillaDetailsControlsProps = {
  leftButtonLabel: string
  rightButtonLabel: {
    name: string
    route: string
  }
}

function VillaDetailsControls({leftButtonLabel, rightButtonLabel: {route, name}}: VillaDetailsControlsProps) {
  return (
    <div className='flex justify-between'>
      <Button
        size='small'
        asChild
      >
        <Link href='/accomodation'>
          <ChevronLeft size={16} />
          <span>{leftButtonLabel}</span>
        </Link>
      </Button>
      <Button
        size='small'
        asChild
      >
        <Link href={`/accomodation/${route}`}>
          <span className='capitalize'>{name}</span>
          <ChevronRight size={16} />
        </Link>
      </Button>
    </div>
  )
}

VillaDetailsControls.displayName = 'VillaDetailsControls'

export {VillaDetailsControls}
