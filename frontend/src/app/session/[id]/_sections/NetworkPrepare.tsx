import React from 'react'
import { motion } from 'framer-motion'

import { EventResponse } from '@/services/api.schemas'
import { Button } from '@/components/ui/button'
import { useApiEventEventIdTopicGenerateGet } from '@/services/소켓/소켓'
import { blackSans } from '@/font/blackHanSans'
import { cn } from '@/lib/utils'

import ChatBubble from './_components/chat-bubble'

interface NetworkPrepareProps {
  event: EventResponse
}

const NetworkPrepare = ({ event }: NetworkPrepareProps) => {
  const topicQuery = useApiEventEventIdTopicGenerateGet(event.event_id, {
    query: {
      enabled: false,
    },
  })

  const handleNext = () => {
    topicQuery.refetch()
  }

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
      <ChatBubble>
        이제 주제 하나가 무작위로 나올거에요.
        <strong className="text-primary">
          해당 주제에 대해 자유롭게 얘기하고
        </strong>
        의견을 나눠보세요. 준비 되셨나요?
      </ChatBubble>
      <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
        <Button
          type="button"
          onClick={() => {
            handleNext()
          }}
          disabled={topicQuery.isFetching}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default NetworkPrepare
