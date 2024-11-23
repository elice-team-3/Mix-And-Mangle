import React from 'react'
import { motion } from 'framer-motion'

import { EventResponse } from '@/services/api.schemas'
import { Button } from '@/components/ui/button'
import { useApiEventEventIdStartGet } from '@/services/소켓/소켓'
import { blackSans } from '@/font/blackHanSans'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'

import ChatBubble from './_components/chat-bubble'

interface WaitProps {
  event: EventResponse
}

const Wait = ({ event }: WaitProps) => {
  const nextQuery = useApiEventEventIdStartGet(event.event_id, {
    query: {
      enabled: false,
    },
  })

  const { isMaster } = useUserStore()

  const handleNext = () => {
    nextQuery.refetch()
  }

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className={cn('mb-16 text-28', blackSans.className)}>대기중</h1>
      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        src="/character/ver-1.png"
        className="w-[80%]"
        alt=""
      />
      <ChatBubble>
        🔔 안녕하세요!
        <br />
        <strong className="text-primary">{event.name}</strong> 에 오신 것을
        환영합니다!
        <br /> 시작 전까지 조금만 기다려주세요.
      </ChatBubble>

      {isMaster && (
        <div className="fixed bottom-0 left-0 mx-auto flex w-full gap-16 p-16 phone:w-full">
          <Button
            type="button"
            onClick={() => {
              handleNext()
            }}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  )
}

export default Wait
