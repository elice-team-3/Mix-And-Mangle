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
                        <Select value={eventForm.getValues().event_category}>
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
          <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
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
