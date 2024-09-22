import * as React from 'react'

type ContactLayoutProps = {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function ContactLayout({children, modal}: ContactLayoutProps) {
  return (
    <React.Fragment>
      {children}
      {modal}
    </React.Fragment>
  )
}
