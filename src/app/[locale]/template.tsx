export default function Template({
  children
}: {
  children: Readonly<React.ReactNode>
}) {
  return (
    <section className='pb-32 space-y-28 h-full animate-page-appear'>
      {children}
    </section>
  )
}
