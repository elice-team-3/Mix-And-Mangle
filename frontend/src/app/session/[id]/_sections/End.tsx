import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { EventResponse } from '@/services/api.schemas'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { blackSans } from '@/font/blackHanSans'

import ChatBubble from './_components/chat-bubble'

const End = ({ event }: { event: EventResponse }) => {
  const [message, setMessage] = useState(
    <motion.div key="mention-0" initial={{ scale: 0 }} animate={{ scale: 1 }}>
      공식 세션은 여기까지에요! 얘기는 잘 나누셨나요?👂
      <br /> 이제 자유 네트워킹 시간이 주어져요. <br /> 자유롭게 원하는 분들과
      얘기를 나눠보세요.
    </motion.div>,
  )

  const [step, setStep] = useState(0)

  return (
    <div className="flex h-full w-full flex-col items-center">
      <h1 className={cn('mb-44 text-28', blackSans.className)}>
        자유 네트워킹
      </h1>
      {step !== 1 && (
        <>
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            src={step === 0 ? '/character/ver-2.png' : '/character/ver-1.png'}
            className="w-[80%]"
            alt=""
          />
          <ChatBubble>{message}</ChatBubble>
        </>
      )}
      {step === 1 && (
        <div className="w-full">
          <div className="mb-50 rounded-12 border-2 border-solid border-[#CAC1E1] bg-white py-20">
            <p className="text-center text-20 font-bold">
              자유롭게 진행해보세요!
            </p>
          </div>
        </div>
      )}
      {step !== 2 && (
        <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
          <Button
            type="button"
            onClick={() => {
              setStep((prev) => prev + 1)

              if (step === 1) {
                setMessage(
                  <>
                    <strong className="text-primary">{event.name}</strong>
                    모든 세션이 종료되었어요.
                    <br /> 함께해주셔서 감사합니다. <br />
                    🎉다음에 또 만나요🎉
                  </>,
                )
              }
            }}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  )
}

export default End
