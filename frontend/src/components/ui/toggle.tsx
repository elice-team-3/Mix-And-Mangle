'use client'

import React, { PropsWithChildren, useState } from 'react'

import { cn } from '@/lib/utils'

interface ToggleProps extends PropsWithChildren {
  checked?: boolean
  defaultChecked?: boolean
  onChange: (checked: boolean) => void
}

export const Toggle = ({
  children,
  checked = false,
  defaultChecked,
  onChange,
}: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(
    checked !== undefined ? checked : defaultChecked,
  )

  return (
    <button
      onClick={() => {
        setIsChecked(!isChecked)
        onChange(!isChecked)
      }}
      className={cn(
        'w-fit rounded-full px-16 py-6',
        isChecked ? 'bg-primary text-white' : 'bg-white',
      )}
    >
      {children}
    </button>
  )
}
