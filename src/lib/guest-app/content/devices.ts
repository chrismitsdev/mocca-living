import {
  IconAirConditioning,
  IconChefHat,
  IconCoffee,
  IconCooker,
  IconCup,
  IconDeviceSpeaker,
  IconDeviceTv,
  IconFridge,
  IconGrill,
  IconLock,
  IconMicrowave,
  IconPool,
  IconTeapot,
  IconToolsKitchen2,
  IconWashMachine,
  IconWind,
  type TablerIcon
} from '@tabler/icons-react'
import type {GuestAppProperty} from '../properties'

// Device guides per property. The text lives in the message files under
// Pages.guest-app.device-guides.<property>.<id>; this list sets the order and
// the icon. Icons only: the owner's photos were a mix of AI renders and phone
// shots, so photos wait for consistent material (e.g. a professional shoot)

export type DeviceGuide = {
  id: string
  icon: TablerIcon
}

const DEVICES: Record<GuestAppProperty, DeviceGuide[]> = {
  // From the owner's device guide (MOCCA_Living_Device_Guide_EN_Corrected_v3)
  'mocca-by-the-sea-dimitra': [
    {
      id: 'mini-pool',
      icon: IconPool
    },
    {
      id: 'smart-tv',
      icon: IconDeviceTv
    },
    {
      id: 'bluetooth-speaker',
      icon: IconDeviceSpeaker
    },
    {
      id: 'coffee-machine',
      icon: IconCoffee
    },
    {
      id: 'ceramic-hob',
      icon: IconCooker
    },
    {
      id: 'cooker-hood',
      icon: IconWind
    },
    {
      id: 'airfryer',
      icon: IconToolsKitchen2
    },
    {
      id: 'microwave',
      icon: IconMicrowave
    },
    {
      id: 'contact-grill',
      icon: IconGrill
    },
    {
      id: 'kettle',
      icon: IconTeapot
    },
    {
      id: 'fridge-freezer',
      icon: IconFridge
    },
    {
      id: 'washing-machine',
      icon: IconWashMachine
    },
    {
      id: 'safe',
      icon: IconLock
    }
  ],
  // Drafted from the owner's photos (brand as visible, exact models unknown);
  // to be checked by the owner
  'mocca-city': [
    {id: 'air-conditioner', icon: IconAirConditioning},
    {id: 'smart-tv', icon: IconDeviceTv},
    {id: 'coffee-machine', icon: IconCoffee},
    {id: 'turkish-coffee', icon: IconCup},
    {id: 'kettle', icon: IconTeapot},
    {id: 'oven', icon: IconChefHat},
    {id: 'microwave', icon: IconMicrowave},
    {id: 'contact-grill', icon: IconGrill},
    {id: 'fridge-freezer', icon: IconFridge},
    {id: 'dishwasher', icon: IconToolsKitchen2},
    {id: 'washing-machine', icon: IconWashMachine},
    // Same Yale safe as Dimitra (confirmed 22 Nov 2026), so the same text
    {id: 'safe', icon: IconLock}
  ]
}

/** Device guides of a property, in display order */
export function devicesOf(slug: GuestAppProperty): DeviceGuide[] {
  return DEVICES[slug]
}

/** One device guide, or undefined for an unknown id */
export function deviceOf(
  slug: GuestAppProperty,
  id: string
): DeviceGuide | undefined {
  return devicesOf(slug).find((device) => device.id === id)
}
