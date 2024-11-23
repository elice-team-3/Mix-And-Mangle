import { create } from 'zustand'

import { UserResponse } from '@/services/api.schemas'

interface UserStore {
  user: UserResponse | null
  setUser: (user: UserResponse) => void
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

export const useUserStore = userStore
