'use client'

import * as React from 'react'
import {type StaticImageData} from 'next/image'

type LightboxContextValue = {
  slides: StaticImageData[]
  selectedIndex: number
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>
}

const defaultValues: LightboxContextValue = {
  slides: [],
  selectedIndex: -1,
  setSelectedIndex: () => {}
}

const LightboxContext = React.createContext<LightboxContextValue>(defaultValues)

function useLightboxContext() {
  return React.useContext(LightboxContext)
}

export {LightboxContext, useLightboxContext}
