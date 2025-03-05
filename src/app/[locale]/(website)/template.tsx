export default function Template({children}: React.PropsWithChildren) {
  return (
    <div className='pb-32 space-y-28 h-full animate-page-appear'>
      {children}
    </div>
  )
}
