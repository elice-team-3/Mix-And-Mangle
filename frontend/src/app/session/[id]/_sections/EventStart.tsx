import React, { useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { EventResponse } from '@/services/api.schemas'
import { Button } from '@/components/ui/button'
import { useApiEventEventIdStartQuizGet } from '@/services/소켓/소켓'
import { cn } from '@/lib/utils'
import { blackSans } from '@/font/blackHanSans'
import { useUserStore } from '@/store/user'

import ChatBubble from './_components/chat-bubble'

const EventStart = ({ event }: { event: EventResponse }) => {
  const { isMaster } = useUserStore()
  const [message, setMessage] = useState(
    <motion.div key="mention-0" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      💬 기다려 주셔서 감사합니다.
      <br />
      지금부터 <strong className="text-primary">{event.name}</strong>
      <br />
      행사를 진행할게요!
    </motion.div>,
  )

  const nextQuery = useApiEventEventIdStartQuizGet(event.event_id, {
    query: {
      enabled: false,
    },
  })

  const handleNext = () => {
    nextQuery.refetch()
  }

  useLayoutEffect(() => {
    setTimeout(() => {
      setMessage(
        <motion.div
          key="mention-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative h-fit w-fit"
        >
          행사는
          <br />
          퀴즈 진행 {'->'} 주제 토론 {'->'} 자유 네트워킹
          <br />
          이렇게 진행돼요.
        </motion.div>,
      )
    }, 1000 * 4)

    setTimeout(() => {
      setMessage(
        <motion.div
          key="mention-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="relative h-fit w-fit"
        >
          그럼 먼저 본 행사와 관련된
          <br />
          <strong className="text-primary">간단한 퀴즈를 진행할게요!</strong>
          <br />
          준비 되셨나요?
        </motion.div>,
      )
    }, 1000 * 8)
  }, [])

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className={cn('mb-16 text-28', blackSans.className)}>진행중</h1>
      <motion.img
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        src="/character/ver-2.png"
        className="w-[80%]"
        alt=""
      />
      <ChatBubble>{message}</ChatBubble>
      {isMaster && (
        <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
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

export default EventStart
