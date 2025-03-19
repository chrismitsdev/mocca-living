import * as React from 'react'
import {useLocale} from 'next-intl'
import {type DateRange} from 'react-day-picker'
import {type LucideProps, RotateCcwIcon} from 'lucide-react'
import {formatDate, cn} from '@/src/lib/utils'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent
} from '@/src/components/ui/popover'
import {Button} from '@/src/components/ui/button'
import {Typography} from '@/src/components/ui/typography'
import {Calendar} from '@/src/app/[locale]/contact/(components)/contact-form-new/calendar'

interface RangeCalendarProps {
  id?: string
  name?: string
  placeholder?: string
  icon?: React.ComponentType<LucideProps>
  date: DateRange
  onDateChange?: (date: DateRange) => void
  minimumNights?: number
  footerMessage?: string
  disabled?: boolean
}

const RangeCalendar: React.FC<RangeCalendarProps> = ({
  id,
  name,
  placeholder,
  icon,
  date,
  onDateChange,
  minimumNights = 2,
  footerMessage,
  disabled
}) => {
  const locale = useLocale()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          value={'hello World'}
          className='px-3 w-full justify-start data-open:border-border-hover data-open:shadow'
          id={id}
          name={name}
          variant='bordered-alt'
          disabled={disabled}
        >
          {icon && React.createElement(icon, {size: 16})}
          <span
            className={cn(
              !date.from &&
                !date.to &&
                'text-sm font-normal text-foreground-muted'
            )}
          >
            {date?.from
              ? date.to
                ? `${formatDate(date.from, locale)} - ${formatDate(
                    date.to,
                    locale
                  )}`
                : `${formatDate(date.from, locale)} -`
              : placeholder}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent align='start'>
          <Calendar
            mode='range'
            fixedWeeks
            required
            selected={date}
            onSelect={onDateChange}
            min={minimumNights}
            calendarLocale={locale}
            onMonthChange={(month) => console.log(month)}
            disabled={{
              before: new Date()
            }}
            footer={
              <>
                <Typography
                  className='text-center !leading-6'
                  variant='mini'
                >
                  {footerMessage}
                </Typography>
                <Button
                  variant='bordered'
                  size='icon-mini'
                  onClick={() =>
                    onDateChange?.({from: undefined, to: undefined})
                  }
                >
                  <RotateCcwIcon size={16} />
                </Button>
              </>
            }
          />
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}

RangeCalendar.displayName = 'RangeCalendar'

export {RangeCalendar}
