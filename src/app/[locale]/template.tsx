export default function Template({children}: React.PropsWithChildren) {
  return (
    <section className='py-12 space-y-24 animate-page-appear'>
      {children}
    </section>
  )
}