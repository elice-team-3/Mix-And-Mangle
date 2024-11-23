'use client'

import React, { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import AIGenerator from '@/components/ui/ai-generator'
import { useAIApiEventsEventIdAiGrouppingPost } from '@/services/이벤트/이벤트'
import { useEventFunnelStore } from '@/store/event-funnel'
import { EventGroupInfoGroupInfo } from '@/services/api.schemas'
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
  const quizMutation = useApiQuizBulkPost()

  const [isComplete, setIsComplete] = useState(false)

  const { job, personality, interest, teamCount, setMatched, selectedQuizs } =
    useEventFunnelStore()

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
          onSuccess: (data) => {
            const result = data as {
              group_info: Record<string, EventGroupInfoGroupInfo>
            }
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
        },
      )
    }

    match()
  }, [])

  return (
    <AIGenerator
      step1="데이터를 분석하고 있어요."
      step1Complete={mutation.isSuccess}
      step2="프로필을 매칭중이에요."
      step2Complete={quizMutation.isSuccess}
      step3="거의 다 됐어요!"
      step3Complete={isComplete}
      isComplete={isComplete}
      onComplete={() => {
        router.push('/event/detail/' + props.params.id + '/match/complete')
      }}
    />
  )
}

export default Page
