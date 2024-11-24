'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { useUserStore } from '@/store/user'
import { removeLocalStorage } from '@/utils/localStorage'

import { Button } from './ui/button'

const LogoutButton = () => {
  const router = useRouter()
  const { setUser, user } = useUserStore()

  const handleLogout = () => {
    setUser(null)
    removeLocalStorage('user')
    router.push('/')
  }

  if (!user) {
    return null
  }

  return (
    <Button size="sm" className="w-fit" onClick={handleLogout}>
      <svg
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd"
        fill="white"
      >
        <path d="M16 2v7h-2v-5h-12v16h12v-5h2v7h-16v-20h16zm2 9v-4l6 5-6 5v-4h-10v-2h10z" />
      </svg>
    </Button>
  )
}

export default LogoutButton
