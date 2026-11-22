import {
  IconDoorExit,
  IconPhone,
  IconPlug,
  IconWifi,
  type TablerIcon
} from '@tabler/icons-react'

export type GuestSection = 'wifi' | 'devices' | 'emergency' | 'check-out'

/**
 * Sections of /guests/<property>, in display order, with the icon used on the
 * home tile and the subpage header. Check-out stays last, so new sections go
 * before it
 */
export const GUEST_SECTIONS: {id: GuestSection; icon: TablerIcon}[] = [
  {id: 'wifi', icon: IconWifi},
  {id: 'devices', icon: IconPlug},
  {id: 'emergency', icon: IconPhone},
  {id: 'check-out', icon: IconDoorExit}
]

/** Icon of a section */
export function sectionIcon(id: GuestSection): TablerIcon {
  const section = GUEST_SECTIONS.find((entry) => entry.id === id)
  if (!section) throw new Error(`Unknown guest-app section ${id}`)
  return section.icon
}
