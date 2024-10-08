import {NextIntlClientProvider, useMessages} from 'next-intl'
import {HeaderNavigation} from '@/components/shared/header-navigation'

function Header() {
  const messages = useMessages() as IntlMessages
  const combinedMessages = {
    ...messages.Metadata.Pages,
    ...messages.Components.LocaleSelect
  }

  return (
    <NextIntlClientProvider messages={combinedMessages}>
      <HeaderNavigation />
    </NextIntlClientProvider>
  )
}

Header.displayName = 'Header'

export {Header}

// import {NextIntlClientProvider, useMessages} from 'next-intl'
// import {HeaderNavigation} from '@/components/shared/header-navigation'

// // type HeaderLink = {
// //   label: keyof Pick<
// //     IntlMessages['Metadata']['Pages'],
// //     'home' | 'accomodation' | 'contact'
// //   >
// //   href: string
// // }

// // const links: HeaderLink[] = [
// //   {label: 'home', href: '/'},
// //   {label: 'accomodation', href: '/accomodation'},
// //   {label: 'contact', href: '/contact'}
// // ]

// // const tLinks = function (t: ReturnType<typeof useTranslations>): HeaderLink[] {
// //   return links.map(({label, href}) => ({
// //     label: t(
// //       label === 'accomodation' ? 'accomodation.root' : label
// //     ) as HeaderLink['label'],
// //     href
// //   }))
// // }

// function Header() {
//   // const links = tLinks(useTranslations('Metadata.Pages'))
//   const messages = useMessages() as IntlMessages
//   const combinedMessages = {
//     ...messages.Metadata.Pages,
//     ...messages.Components.LocaleSelect
//   }

//   return (
//     <NextIntlClientProvider messages={combinedMessages}>
//       <HeaderNavigation />
//     </NextIntlClientProvider>
//   )
// }

// Header.displayName = 'Header'

// export {Header}
