import { create } from 'zustand'

import { UserResponse } from '@/services/api.schemas'
import { setLocalStorage } from '@/utils/localStorage'

interface UserStore {
  user: UserResponse | null
  isMaster: boolean
  setIsMaster: (isMaster: boolean) => void
  setUser: (user: UserResponse | null) => void
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  isMaster: true,
  setUser: (user) => set({ user }),
  setIsMaster: (isMaster) => {
    setLocalStorage('isMaster', isMaster)
    set({ isMaster })
  },
}))

export const useUserStore = userStore
