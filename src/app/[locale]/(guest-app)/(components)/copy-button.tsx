'use client'

import {IconCopy} from '@tabler/icons-react'
import {Button} from '@/src/components/ui/button'
import {toast} from '@/src/components/ui/toast'

type CopyButtonProps = {
  value: string
  label: string
  copiedLabel: string
  failedLabel: string
  failedDescription: string
}

// The Clipboard API only exists on secure pages (HTTPS or localhost)
async function copyWithClipboardApi(value: string): Promise<boolean> {
  if (!window.isSecureContext || !navigator.clipboard) return false
  try {
    await navigator.clipboard.writeText(value)
    return true
  } catch {
    return false
  }
}

// Older fallback (e.g. a phone testing over plain http on the LAN): copy the
// selection of a hidden field. 16px avoids iOS zooming into it
function copyWithSelection(value: string): boolean {
  const field = document.createElement('textarea')
  field.value = value
  field.readOnly = true
  field.style.cssText =
    'position:fixed;top:0;left:-9999px;opacity:0;font-size:16px'
  document.body.append(field)
  field.select()
  field.setSelectionRange(0, value.length)
  try {
    return document.execCommand('copy')
  } catch {
    return false
  } finally {
    field.remove()
  }
}

function CopyButton({
  value,
  label,
  copiedLabel,
  failedLabel,
  failedDescription
}: CopyButtonProps) {
  async function copy() {
    const copied =
      (await copyWithClipboardApi(value)) || copyWithSelection(value)

    toast(
      copied
        ? {title: copiedLabel, description: value, status: 'success'}
        : {title: failedLabel, description: failedDescription, status: 'error'}
    )
  }

  return (
    <Button
      variant='secondary'
      onClick={copy}
    >
      {label}
      <IconCopy />
    </Button>
  )
}

export {CopyButton}
