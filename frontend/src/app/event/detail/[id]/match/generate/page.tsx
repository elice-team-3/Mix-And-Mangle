'use client'

import React, { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import AIGenerator from '@/components/ui/ai-generator'
import {
  useAIApiEventsEventIdAiGrouppingPost,
  useApiEventsEventIdSetGroupPost,
} from '@/services/이벤트/이벤트'
import { useEventFunnelStore } from '@/store/event-funnel'
import {
  useApiQuizBulkPost,
  useApiQuizGetSuspense,
} from '@/services/이벤트-퀴즈/이벤트-퀴즈'

interface PageProps {
  params: {
    id: string
  }
}

const Page = (props: PageProps) => {
  const router = useRouter()
  const mutation = useAIApiEventsEventIdAiGrouppingPost()
  const joinMutation = useApiEventsEventIdSetGroupPost()
  const quizMutation = useApiQuizBulkPost()

  const [isComplete, setIsComplete] = useState(false)

  const {
    job,
    personality,
    interest,
    teamCount,
    resetQuiz,
    setMatched,
    selectedQuizs,
  } = useEventFunnelStore()

  const existQuizQuery = useApiQuizGetSuspense({
    event_id: parseInt(props.params.id),
  })
  const existQuiz = existQuizQuery.data.map((quiz) => quiz.answer)

  const newQuizs = selectedQuizs.filter((quiz) => {
    return !existQuiz.includes(quiz.answer)
  })

  useLayoutEffect(() => {
    const match = async () => {
      await mutation.mutateAsync(
        {
          eventId: parseInt(props.params.id),
          data: {
            job: job ? '유사성' : '랜덤',
            personality: personality ? '유사성' : '랜덤',
            interest: interest ? '유사성' : '랜덤',
            count: teamCount,
          },
        },
        {
          onSuccess: async (data) => {
            const result = data as {
              group_info: Array<{
                user_id: number
                group_id: number
                user_name: string
              }>
            }

            await joinMutation.mutateAsync({
              eventId: parseInt(props.params.id),
              data: {
                group_info: result.group_info,
              },
            })

            setMatched(result.group_info)
            if (newQuizs.length > 0) {
              quizMutation.mutate(
                {
                  data: {
                    event_id: parseInt(props.params.id),
                    quizzes: newQuizs,
                  },
                },
                {
                  onSuccess: () => {
                    setIsComplete(true)
                  },
                },
              )
            } else {
              setTimeout(() => {
                setIsComplete(true)
              }, 1000)
            }
          },
          onError: () => {
            resetQuiz()
            router.back()
          },
        },
      )
    }

    match()
  }, [])

  return (
    <>
      <img
        src="/images/gradient.png"
        alt=""
        className="fixed left-0 top-0 h-full w-full"
      />
      <AIGenerator
        step1="데이터를 분석하고 있어요."
        step1Complete
        step2="프로필을 매칭중이에요."
        step2Complete={mutation.isSuccess}
        step3="거의 다 됐어요!"
        step3Complete={quizMutation.isSuccess}
        isComplete={isComplete}
        onComplete={() => {
          router.push('/event/detail/' + props.params.id + '/match/complete')
        }}
      />
    </>
  )
}

export default Page
