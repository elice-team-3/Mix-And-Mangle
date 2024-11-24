'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { useApiSessionsPost } from '@/services/네트워크-세션/네트워크-세션'
import { useUserStore } from '@/store/user'
import { useApiEventsEventIdGetSuspense } from '@/services/이벤트/이벤트'
import { Button } from '@/components/ui/button'

const Page = ({ params }: { params: { id: string } }) => {
  const mutation = useApiSessionsPost()
  const { user } = useUserStore()

  const evnetQuery = useApiEventsEventIdGetSuspense(Number(params.id))

  const router = useRouter()

  const handleSubmit = async () => {
    if (!user) {
      router.push('/user/register')
      return
    }

    await mutation.mutateAsync({
      data: {
        event_id: Number(params.id),
        user_id: user.user_id,
      },
    })

    router.push('/event')
  }

  return (
    <div className="flex h-full flex-col justify-center gap-24">
      <h1 className="text-center text-22 font-semibold">
        <strong className="text-primary">{evnetQuery.data.name}</strong>
        <br />
        행사에 초대되었어요.
        <br />
        참가하려면 버튼을 눌러주세요!
      </h1>
      <Button onClick={handleSubmit} variant="secondary">
        초대 수락하기
      </Button>
    </div>
  )
}

export default Page
