import { create } from 'zustand'

import { UserResponse } from '@/services/api.schemas'
import { getLocalStorage } from '@/utils/localStorage'

interface UserStore {
  user: UserResponse | null
  setUser: (user: UserResponse) => void
}

export const userStore = create<UserStore>((set) => ({
  user: getLocalStorage('user'),
  setUser: (user) => set({ user }),
}))

export const useUserStore = userStore
