'use client'

import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { apiUsersGetResponseItem } from '@/services/사용자/사용자.zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useApiUsersPost } from '@/services/사용자/사용자'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'
import { setLocalStorage } from '@/utils/localStorage'

const INTERESTS = [
  {
    name: '아웃도어/여행',
    icon: '/icon/1.png',
    activeIcon: '/icon/1-1.png',
  },
  {
    name: '운동/스포츠',
    icon: '/icon/2.png',
    activeIcon: '/icon/2-1.png',
  },
  {
    name: '게임/오락',
    icon: '/icon/3.png',
    activeIcon: '/icon/3-1.png',
  },
  {
    name: '문화/공연/축제',
    icon: '/icon/4.png',
    activeIcon: '/icon/4-1.png',
  },
  {
    name: '사교/인맥',
    icon: '/icon/5.png',
    activeIcon: '/icon/5-1.png',
  },
  {
    name: '인문학/책',
    icon: '/icon/6.png',
    activeIcon: '/icon/6-1.png',
  },
  {
    name: '사진/영상',
    icon: '/icon/7.png',
    activeIcon: '/icon/7-1.png',
  },
  {
    name: '공예/만들기',
    icon: '/icon/8.png',
    activeIcon: '/icon/8-1.png',
  },
  {
    name: '컴퓨터',
    icon: '/icon/9.png',
    activeIcon: '/icon/9-1.png',
  },
  {
    name: '뷰티/패션',
    icon: '/icon/10.png',
    activeIcon: '/icon/10-1.png',
  },
  {
    name: '영화',
    icon: '/icon/11.png',
    activeIcon: '/icon/11-1.png',
  },
  {
    name: '쇼핑',
    icon: '/icon/12.png',
    activeIcon: '/icon/12-1.png',
  },
  {
    name: '재테크',
    icon: '/icon/13.png',
    activeIcon: '/icon/13-1.png',
  },
  {
    name: '반려동물',
    icon: '/icon/14.png',
    activeIcon: '/icon/14-1.png',
  },
  {
    name: '차/오토바이',
    icon: '/icon/15.png',
    activeIcon: '/icon/15-1.png',
  },
  {
    name: '그 외 관심사',
    icon: '/icon/16.png',
    activeIcon: '/icon/16-1.png',
  },
]
const UserForm = () => {
  const [step, setStep] = useState<'info' | 'interest'>('info')
  const { setUser } = useUserStore()

  const userForm = useForm<z.infer<typeof apiUsersGetResponseItem>>({
    resolver: zodResolver(apiUsersGetResponseItem),
    mode: 'onBlur',
    defaultValues: {
      user_id: uuidv4(),
      name: '',
      birth_date: '',
      job: '',
      personality: '내향적',
      interest: [],
      hobby: [],
    },
  })

  const mutation = useApiUsersPost()

  const handleSubmit = async () => {
    const birthDate = userForm.watch('birth_date')
    const date = `${birthDate.slice(0, 4)}-${birthDate.slice(4, 6)}-${birthDate.slice(6)}`

    const data = await mutation.mutateAsync({
      data: {
        ...userForm.watch(),
        birth_date: date,
      },
    })

    if (data) {
      setUser(data)
      setLocalStorage('user', data)
    }
  }

  const parseDate = (date: string) => {
    if (date.length < 5) {
      return date
    }
    if (date.length < 7) {
      return `${date.slice(0, 4)}.${date.slice(4)}`
    } else {
      return `${date.slice(0, 4)}.${date.slice(4, 6)}.${date.slice(6)}`
    }
  }

  const isInfoStepValid =
    userForm.watch('name') &&
    userForm.watch('birth_date').length === 8 &&
    userForm.watch('job') &&
    userForm.watch('personality')

  return (
    <div className="flex h-fit flex-col pb-100">
      <div className="mb-24 flex w-full gap-12">
        <div className="h-12 w-full rounded-full bg-primary" />
        <div
          className={cn(
            'h-12 w-full rounded-full transition-colors duration-300',
            step === 'info' ? 'bg-[#DBDBDB]' : 'bg-primary',
          )}
        />
      </div>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-18 text-22 font-semibold"
      >
        {step === 'info'
          ? '기본 정보를 입력해주세요.'
          : '마지막으로 관심사를 알려주세요!'}
      </motion.p>
      <Form {...userForm}>
        <form
          className="flex flex-1 flex-col justify-between"
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          {step === 'info' && (
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
              <FormField
                name="birth_date"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>생년월일(8자리)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="2000.01.01"
                          value={parseDate(userForm.watch('birth_date'))}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^0-9]/g, '')

                            if (value.length > 8) {
                              return
                            }

                            userForm.setValue('birth_date', value)
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                name="job"
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>직업</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            userForm.setValue('job', value)
                          }}
                          value={userForm.watch('job')}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="직업을 선택해주세요" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="개발자">개발자</SelectItem>
                            <SelectItem value="디자이너">디자이너</SelectItem>
                            <SelectItem value="기획자">기획자</SelectItem>
                            <SelectItem value="마케터">마케터</SelectItem>
                            <SelectItem value="기타">기타</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
              <FormField
                name="personality"
                render={() => {
                  return (
                    <FormItem>
                      <FormLabel>성격</FormLabel>
                      <FormControl>
                        <div className="flex w-full justify-between">
                          {(['내향적', '양면성', '외향적'] as const).map(
                            (item) => (
                              <button
                                key={item}
                                type="button"
                                className={cn(
                                  'w-fit rounded-full bg-[#B0B0B0] px-34 py-10 text-white transition-colors duration-300',
                                  item === userForm.watch('personality') &&
                                    'bg-primary',
                                )}
                                onClick={() => {
                                  userForm.setValue('personality', item)
                                }}
                              >
                                {item}
                              </button>
                            ),
                          )}
                        </div>
                      </FormControl>
                    </FormItem>
                  )
                }}
              />
            </motion.div>
          )}
          {step === 'interest' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-3 gap-12"
            >
              {INTERESTS.map((interest) => {
                const existed = userForm.watch('interest') || []
                const isActive = existed.includes(interest.name)

                return (
                  <button
                    type="button"
                    className={cn(
                      'flex w-full flex-col items-center gap-4 rounded-12 border-1 border-solid bg-white px-18 py-13 transition-all duration-300',
                      isActive ? 'border-primary' : 'border-white',
                    )}
                    onClick={() => {
                      if (isActive) {
                        userForm.setValue(
                          'interest',
                          existed.filter((item) => item !== interest.name),
                        )
                      } else {
                        userForm.setValue('interest', [
                          ...existed,
                          interest.name,
                        ])
                      }
                    }}
                    key={interest.name}
                  >
                    <img
                      src={isActive ? interest.activeIcon : interest.icon}
                      className="h-34 w-34"
                      alt=""
                    />
                    <p
                      className={cn(
                        'text-nowrap text-14',
                        isActive ? 'text-primary' : 'text-[#999]',
                      )}
                    >
                      {interest.name}
                    </p>
                  </button>
                )
              })}
            </motion.div>
          )}
          <div className="absolute bottom-0 left-0 flex w-full gap-16 phone:fixed phone:p-16">
            {step === 'interest' && (
              <Button
                type="button"
                fit
                variant="tertiary"
                onClick={() => {
                  setStep('info')
                }}
              >
                이전
              </Button>
            )}
            <Button
              type="button"
              disabled={step === 'info' && !isInfoStepValid}
              onClick={() => {
                if (step === 'info') {
                  setStep('interest')
                } else {
                  handleSubmit()
                }
              }}
            >
              다음
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default UserForm
