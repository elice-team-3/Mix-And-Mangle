import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { EventResponse } from '@/services/api.schemas'
import { Button } from '@/components/ui/button'
import { useApiQuizGetSuspense } from '@/services/이벤트-퀴즈/이벤트-퀴즈'
import { cn } from '@/lib/utils'
import { useApiEventEventIdNetworkingGroupPrepareGet } from '@/services/소켓/소켓'
import { blackSans } from '@/font/blackHanSans'
import { useUserStore } from '@/store/user'

import QuizBlock from './_components/QuizBlock'
import ChatBubble from './_components/chat-bubble'

export const SECOND_PER_QUIZ = 10

const Quiz = ({ event }: { event: EventResponse }) => {
  const quizQuery = useApiQuizGetSuspense({
    event_id: event.event_id,
  })
  const { isMaster } = useUserStore()
  const [currentQuiz, setCurrentQuiz] = useState(quizQuery.data[0])
  const [quizIndex, setQuizIndex] = useState(0)
  const [isQuizEnd, setIsQuizEnd] = useState(false)

  const quizList = quizQuery.data

  useEffect(() => {
    quizList.forEach((quiz, idx) => {
      if (idx > 0) {
        setTimeout(
          () => {
            setCurrentQuiz(quiz)
            setQuizIndex(idx)

            if (idx === quizList.length - 1) {
              setTimeout(() => {
                setIsQuizEnd(true)
              }, 1000 * 10)
            }
          },
          1000 * SECOND_PER_QUIZ * idx,
        )
      }
    })
  }, [])

  const nextQuery = useApiEventEventIdNetworkingGroupPrepareGet(
    event.event_id,
    {
      query: {
        enabled: false,
      },
    },
  )

  const handleNext = () => {
    nextQuery.refetch()
  }

  return (
    <div>
      <img
        src="/images/gradient.png"
        alt=""
        className="fixed left-0 top-0 h-full w-full"
      />
      <div className="relative">
        <h1 className={cn('mb-16 text-center text-28', blackSans.className)}>
          퀴즈
        </h1>
        {!isQuizEnd ? (
          <>
            <div className="mb-40 flex justify-center gap-8">
              {Array.from({ length: quizList.length }, (_, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'flex h-24 w-24 items-center justify-center rounded-full bg-white text-12 font-extrabold text-black transition-all duration-300',
                    quizIndex === idx && 'bg-primary text-white',
                  )}
                >
                  {idx + 1}
                </div>
              ))}
            </div>
            <QuizBlock quiz={currentQuiz} />
          </>
        ) : (
          <div className="flex w-full flex-col items-center">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              src="/character/ver-1.png"
              className="w-[80%]"
              alt=""
            />
            <ChatBubble>
              준비한 퀴즈는 여기까지에요! 참여해주셔서 감사합니다🌸
              <br />
              이제 나누어진 팀끼리 모여주세요.
            </ChatBubble>
          </div>
        )}

        {isMaster && isQuizEnd && (
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
    </div>
  )
}

export default Quiz
