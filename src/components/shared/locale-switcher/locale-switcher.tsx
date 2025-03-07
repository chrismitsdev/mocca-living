import {NextIntlClientProvider, useMessages} from 'next-intl'
import {ClientLocaleSwitcher} from '@/src/components/shared/locale-switcher/client-locale-switcher'

interface LocaleSwitcherProps
  extends React.ComponentPropsWithoutRef<typeof ClientLocaleSwitcher> {}

const LocaleSwitcher: React.FC<LocaleSwitcherProps> = (props) => {
  const messages = useMessages() as IntlMessages

  return (
    <NextIntlClientProvider messages={messages.Components.LocaleSwitcher}>
      <ClientLocaleSwitcher {...props} />
    </NextIntlClientProvider>
  )
}

LocaleSwitcher.displayName = 'LocaleSwitcher'

export {LocaleSwitcher}
