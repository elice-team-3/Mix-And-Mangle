'use client'

import { motion } from 'framer-motion'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { apiEventsPostBody } from '@/services/이벤트/이벤트.zod'
import { Textarea } from '@/components/ui/textarea'
import {
  useApiEventsEventIdPut,
  useApiEventsPost,
} from '@/services/이벤트/이벤트'

const categories = [
  '금융업',
  'IT 산업',
  '제조업',
  '보건의료',
  '에너지',
  '교육',
  '소매업',
  '건설업',
  '농업',
  '물류 및 운송',
  '미디어/엔터테인먼트',
  '관광 및 호텔',
  '부동산',
  '식품 및 음료',
  '전기/전자',
  '화학 산업',
]

interface EventFormProps {
  defaultValues?: z.infer<typeof apiEventsPostBody>
  id?: number
  mode: 'create' | 'edit'
}

const EventForm = ({ defaultValues, id, mode }: EventFormProps) => {
  const router = useRouter()

  const today = new Date()
  const todayString = today.toISOString().split('T')[0]

  const eventForm = useForm<z.infer<typeof apiEventsPostBody>>({
    resolver: zodResolver(apiEventsPostBody),
    mode: 'onBlur',
    defaultValues: defaultValues || {
      name: '',
      description: '',
      status: 'wait',
      start_date: todayString,
      event_category: categories[0],
      end_date: todayString,
      participant_count: 0,
      additional_info: '',
    },
  })

  const createMutation = useApiEventsPost()
  const editMutation = useApiEventsEventIdPut()

  const client = useQueryClient()

  const handleSubmit = () => {
    const data = eventForm.getValues()

    if (mode === 'create') {
      createMutation.mutate(
        { data },
        {
          onSuccess: () => {
            client.invalidateQueries({
              queryKey: ['api/events'],
            })
            router.push('/event')
          },
        },
      )
    }

    if (mode === 'edit' && id && defaultValues) {
      editMutation.mutate(
        {
          eventId: id,
          data,
        },
        {
          onSuccess: () => {
            router.push('/event')
          },
        },
      )
    }
  }

  const onClipboardCopy = () => {
    navigator.clipboard.writeText(
      window.location.origin + '/event/detail/' + id + '/invite',
    )
    alert('링크가 복사되었습니다.')
  }

  return (
    <div className="flex h-fit flex-col pb-100">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-18 text-22 font-semibold"
      >
        안녕하세요!
        <br /> 행사 정보를 입력해주세요.
      </motion.p>
      <Form {...eventForm}>
        <form
          className="flex flex-1 flex-col justify-between"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            className="flex flex-col gap-8"
          >
            <FormField
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>이름</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
            <FormItem>
              <FormLabel>일정</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-16">
                  <Input
                    onChange={(e) => {
                      const value = e.target.value
                      eventForm.setValue('start_date', value + ' 00:00:00')
                    }}
                    defaultValue={
                      eventForm.watch('start_date').split(' ')[0] || todayString
                    }
                    type="date"
                  />
                  <Input
                    onChange={(e) => {
                      const value = e.target.value
                      eventForm.setValue('end_date', value + ' 00:00:00')
                    }}
                    defaultValue={
                      eventForm.watch('end_date').split(' ')[0] || todayString
                    }
                    type="date"
                  />
                </div>
              </FormControl>
            </FormItem>
            <div className="flex gap-16">
              <FormField
                name="event_category"
                render={() => {
                  return (
                    <FormItem className="flex-1">
                      <FormLabel>분야</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            eventForm.setValue('event_category', value)
                          }}
                          value={eventForm.getValues().event_category}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue
                              className="min-w-full"
                              placeholder="분야를 선택해주세요"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormItem className="w-[100px]">
                <FormLabel>참가 인원 설정</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step={1}
                    min={1}
                    onChange={(e) => {
                      let value = Number(e.target.value)

                      if (value < 1) {
                        value = 1
                      }

                      eventForm.setValue('participant_count', value)
                    }}
                    value={eventForm.watch('participant_count') || 1}
                  />
                </FormControl>
              </FormItem>
            </div>
            <FormField
              name="additional_info"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>내용</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[200px]"
                        maxLength={100}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </motion.div>
          {mode === 'edit' && (
            <Button
              size="sm"
              type="button"
              variant="secondary"
              onClick={onClipboardCopy}
            >
              <div className="flex gap-4">
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.5 6.94C18.4896 6.84813 18.4695 6.75763 18.44 6.67V6.58C18.3919 6.47718 18.3278 6.38267 18.25 6.3L12.25 0.3C12.1673 0.222216 12.0728 0.158081 11.97 0.11C11.9402 0.10576 11.9099 0.10576 11.88 0.11C11.7784 0.0517412 11.6662 0.0143442 11.55 0H7.5C6.70435 0 5.94129 0.316071 5.37868 0.87868C4.81607 1.44129 4.5 2.20435 4.5 3V4H3.5C2.70435 4 1.94129 4.31607 1.37868 4.87868C0.816071 5.44129 0.5 6.20435 0.5 7V17C0.5 17.7956 0.816071 18.5587 1.37868 19.1213C1.94129 19.6839 2.70435 20 3.5 20H11.5C12.2956 20 13.0587 19.6839 13.6213 19.1213C14.1839 18.5587 14.5 17.7956 14.5 17V16H15.5C16.2956 16 17.0587 15.6839 17.6213 15.1213C18.1839 14.5587 18.5 13.7956 18.5 13V7C18.5 7 18.5 7 18.5 6.94ZM12.5 3.41L15.09 6H13.5C13.2348 6 12.9804 5.89464 12.7929 5.70711C12.6054 5.51957 12.5 5.26522 12.5 5V3.41ZM12.5 17C12.5 17.2652 12.3946 17.5196 12.2071 17.7071C12.0196 17.8946 11.7652 18 11.5 18H3.5C3.23478 18 2.98043 17.8946 2.79289 17.7071C2.60536 17.5196 2.5 17.2652 2.5 17V7C2.5 6.73478 2.60536 6.48043 2.79289 6.29289C2.98043 6.10536 3.23478 6 3.5 6H4.5V13C4.5 13.7956 4.81607 14.5587 5.37868 15.1213C5.94129 15.6839 6.70435 16 7.5 16H12.5V17ZM16.5 13C16.5 13.2652 16.3946 13.5196 16.2071 13.7071C16.0196 13.8946 15.7652 14 15.5 14H7.5C7.23478 14 6.98043 13.8946 6.79289 13.7071C6.60536 13.5196 6.5 13.2652 6.5 13V3C6.5 2.73478 6.60536 2.48043 6.79289 2.29289C6.98043 2.10536 7.23478 2 7.5 2H10.5V5C10.5 5.79565 10.8161 6.55871 11.3787 7.12132C11.9413 7.68393 12.7044 8 13.5 8H16.5V13Z"
                    fill="black"
                  />
                </svg>
                <span className="text-black">행사 링크 복사하기</span>
              </div>
            </Button>
          )}
          <div className="fixed bottom-0 left-0 mx-auto flex w-full gap-16 p-16 phone:w-full">
            {mode === 'edit' && (
              <Button
                type="button"
                variant="tertiary"
                fit
                onClick={() => {
                  handleSubmit()
                }}
              >
                수정
              </Button>
            )}
            <Button
              type="button"
              onClick={() => {
                if (mode === 'create') {
                  handleSubmit()
                } else {
                  router.push('/event/detail/' + id + '/match')
                }
              }}
            >
              {mode === 'create' ? '행사 만들기' : '세부 정보 설정하기'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default EventForm
