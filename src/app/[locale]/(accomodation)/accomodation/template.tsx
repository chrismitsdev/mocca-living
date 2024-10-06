export default function AccomodationTemplate({
  children
}: {
  children: Readonly<React.ReactNode>
}) {
  return (
    <section className='pb-32 bg-surface-1 space-y-28 h-full animate-page-appear'>
      {children}
    </section>
  )
}
