/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable promise/prefer-await-to-callbacks */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
'use client'

import { useEffect } from 'react'

import { useToast } from '@/hooks/use-toast'
import { AXIOS_INSTANCE } from '@/utils/axios'
import { useUserStore } from '@/store/user'
import { getLocalStorage } from '@/utils/localStorage'
import { UserResponse } from '@/services/api.schemas'

const InitialSetting = () => {
  const { toast } = useToast()
  const { setUser } = useUserStore()
  useEffect(() => {
    setUser(getLocalStorage('user') as UserResponse)

    AXIOS_INSTANCE.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        toast({
          title: error.response.data.detail,
          variant: 'destructive',
        })
        return Promise.reject(error)
      },
    )
  }, [])

  return null
}

export default InitialSetting
