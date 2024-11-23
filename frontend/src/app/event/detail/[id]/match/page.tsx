/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

import {
  useAIApiEventsEventIdAiQuizGet,
  useApiEventsEventIdGetSuspense,
} from '@/services/이벤트/이벤트'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Stepper from '@/components/ui/stepper'
import { Skeleton } from '@/components/ui/skeleton'
import { useEventFunnelStore } from '@/store/event-funnel'

interface Props {
  params: {
    id: string
  }
}

const Page = (props: Props) => {
  const { params } = props

  const id = parseInt(params.id)

  const query = useApiEventsEventIdGetSuspense(id)
  const event = query.data

  const maxTeamSize = event.participant_count ? event.participant_count / 2 : 2
  const teamItems = Array.from({ length: maxTeamSize }, (_, i) => String(i + 1))

  const {
    personality,
    setPersonality,
    job,
    setJob,
    interest,
    setInterest,
    selectedQuizs,
    addQuiz,
    removeQuiz,
    resetQuiz,
    teamCount,
    setTeamCount,
  } = useEventFunnelStore()

  const [type, setType] = useState<'random' | 'quiz'>('random')
  const [quizCount, setQuizCount] = useState(5)
  const router = useRouter()

  const quizQuery = useAIApiEventsEventIdAiQuizGet(id, {
    query: {
      enabled: type === 'quiz',
    },
  })

  const quizList = quizQuery.data?.quizzes || []

  const isSelectAllQuiz = quizCount === selectedQuizs.length

  return (
    <div className="pb-100">
      <Stepper maxSteps={2} currentStep={type === 'random' ? 1 : 2} />
      <h1 className="mb-12 text-22 font-semibold">
        {type === 'random' ? (
          <>
            팀 나누기를 위한
            <br />
            세부 정보를 입력해주세요!
          </>
        ) : (
          <>
            마지막으로 퀴즈를 골라주세요!
            <br />
            <p className="text-16 font-semibold text-gray-500">
              밍글 AI가 추천해드려요. 마음에 드는 문제를 골라주세요.
            </p>
          </>
        )}
      </h1>
      {type === 'random' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col"
        >
          <div className="mb-16">
            <Label>참가인원</Label>
            <Input value={(event.participant_count || 0) + '명'} disabled />
          </div>
          <div className="mb-16 flex justify-between gap-16">
            <div className="w-full">
              <Label>팀 개수</Label>
              <Select
                value={String(teamCount)}
                onValueChange={(value) => {
                  const count = Number(value)
                  setTeamCount(count)
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teamItems.map((item) => (
                    <SelectItem value={item} key={item}>
                      {item}팀
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-[25%]">
              <Label>퀴즈 개수</Label>
              <Input
                type="number"
                value={quizCount}
                min={1}
                max={10}
                step={1}
                onChange={(e) => {
                  const value = Number(e.target.value)

                  if (value < 1) {
                    setQuizCount(1)
                    return
                  }

                  if (value > 10) {
                    setQuizCount(10)
                    return
                  }

                  setQuizCount(value)
                }}
              />
            </div>
          </div>
          <div className="mb-16">
            <Label>성향</Label>
            <div className="flex gap-12">
              <Button
                variant={personality ? 'default' : 'secondary'}
                onClick={() => setPersonality(true)}
              >
                비슷한 성향
              </Button>
              <Button
                variant={personality ? 'secondary' : 'default'}
                onClick={() => setPersonality(false)}
              >
                무작위
              </Button>
            </div>
          </div>
          <div className="mb-16">
            <Label>직업</Label>
            <div className="flex gap-12">
              <Button
                variant={job ? 'default' : 'secondary'}
                onClick={() => setJob(true)}
              >
                비슷한 직업
              </Button>
              <Button
                variant={job ? 'secondary' : 'default'}
                onClick={() => setJob(false)}
              >
                무작위
              </Button>
            </div>
          </div>
          <div className="mb-16">
            <Label>분야</Label>
            <div className="flex gap-12">
              <Button
                variant={interest ? 'default' : 'secondary'}
                onClick={() => setInterest(true)}
              >
                비슷한 분야
              </Button>
              <Button
                variant={interest ? 'secondary' : 'default'}
                onClick={() => setInterest(false)}
              >
                무작위
              </Button>
            </div>
          </div>
        </motion.div>
      )}
      {type === 'quiz' && (
        <div>
          <div
            onClick={() => {
              resetQuiz()
              quizQuery.refetch()
            }}
            className="mb-12 flex items-center gap-4"
          >
            <p>퀴즈 재생성하기</p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.91 15.51H15.38C15.1148 15.51 14.8604 15.6154 14.6729 15.8029C14.4854 15.9904 14.38 16.2448 14.38 16.51C14.38 16.7752 14.4854 17.0296 14.6729 17.2171C14.8604 17.4046 15.1148 17.51 15.38 17.51H17.78C16.6769 18.6627 15.2544 19.4593 13.6952 19.7974C12.1359 20.1355 10.5112 19.9996 9.02978 19.4072C7.54834 18.8149 6.27787 17.7931 5.38159 16.4732C4.48531 15.1532 4.00418 13.5955 4 12C4 11.7348 3.89464 11.4804 3.70711 11.2929C3.51957 11.1054 3.26522 11 3 11C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2.00529 13.9528 2.58222 15.8613 3.6596 17.49C4.73699 19.1187 6.26767 20.3964 8.06274 21.1652C9.85782 21.9341 11.8387 22.1605 13.761 21.8166C15.6833 21.4727 17.4628 20.5735 18.88 19.23V21C18.88 21.2652 18.9854 21.5196 19.1729 21.7071C19.3604 21.8946 19.6148 22 19.88 22C20.1452 22 20.3996 21.8946 20.5871 21.7071C20.7746 21.5196 20.88 21.2652 20.88 21V16.5C20.8775 16.2416 20.7752 15.9943 20.5943 15.8097C20.4135 15.6251 20.1683 15.5177 19.91 15.51ZM12 2C9.43639 2.00731 6.97349 2.99891 5.12 4.77V3C5.12 2.73478 5.01464 2.48043 4.82711 2.29289C4.63957 2.10536 4.38522 2 4.12 2C3.85478 2 3.60043 2.10536 3.41289 2.29289C3.22536 2.48043 3.12 2.73478 3.12 3V7.5C3.12 7.76522 3.22536 8.01957 3.41289 8.20711C3.60043 8.39464 3.85478 8.5 4.12 8.5H8.62C8.88522 8.5 9.13957 8.39464 9.32711 8.20711C9.51464 8.01957 9.62 7.76522 9.62 7.5C9.62 7.23478 9.51464 6.98043 9.32711 6.79289C9.13957 6.60536 8.88522 6.5 8.62 6.5H6.22C7.32247 5.34787 8.74409 4.5515 10.3024 4.21311C11.8607 3.87472 13.4846 4.00975 14.9656 4.60086C16.4466 5.19198 17.7172 6.21221 18.6142 7.5306C19.5113 8.849 19.9938 10.4054 20 12C20 12.2652 20.1054 12.5196 20.2929 12.7071C20.4804 12.8946 20.7348 13 21 13C21.2652 13 21.5196 12.8946 21.7071 12.7071C21.8946 12.5196 22 12.2652 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z"
                fill="black"
              />
            </svg>
          </div>
          <motion.div className="flex flex-col gap-12">
            {quizQuery.isFetching
              ? Array.from({ length: 10 }, (_, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i}
                  >
                    <Skeleton className="h-[100px] w-full" />
                  </motion.div>
                ))
              : quizList.map((quiz, idx) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      key={quiz.question}
                      className={cn(
                        'rounded-12 border-2 border-solid border-gray-300 bg-white px-10 py-13',
                        selectedQuizs.includes(quiz) && 'border-[#31C16F]',
                      )}
                      onClick={() => {
                        if (selectedQuizs.includes(quiz)) {
                          removeQuiz(quiz)
                        } else {
                          if (isSelectAllQuiz) {
                            return
                          }

                          addQuiz(quiz)
                        }
                      }}
                    >
                      <span className="mb-4 inline-block rounded-4 bg-gray-300 px-10 py-3 text-14">
                        Q{idx + 1}
                      </span>
                      <p className="mb-12 text-primary">{quiz.question}</p>
                      <div className="flex flex-wrap justify-between">
                        {quiz.options.map((option, idx) => (
                          <div key={option} className="flex gap-12">
                            <p className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-300 text-14">
                              {idx + 1}
                            </p>
                            <p
                              className={cn(
                                'text-14',
                                quiz.answer === option
                                  ? 'text-[#31C16F]'
                                  : 'text-gray-500',
                              )}
                            >
                              {option}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                })}
          </motion.div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
        <Button
          type="button"
          variant="tertiary"
          fit
          onClick={() => {
            if (type === 'quiz') {
              setType('random')
              resetQuiz()
            } else {
              router.push('/event/detail/' + id)
            }
          }}
        >
          취소
        </Button>
        <Button
          onClick={() => {
            if (type === 'random') {
              setType('quiz')
            } else {
              router.push('/event/detail/' + id + '/match' + '/generate')
            }
          }}
          disabled={type === 'quiz' && !isSelectAllQuiz}
          type="button"
        >
          다음
        </Button>
      </div>
    </div>
  )
}

export default Page
