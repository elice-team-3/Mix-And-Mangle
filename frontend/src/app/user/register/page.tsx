'use client'

import React from 'react'
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

const Page = () => {
  const userForm = useForm<z.infer<typeof apiUsersGetResponseItem>>({
    resolver: zodResolver(apiUsersGetResponseItem),
    mode: 'onBlur',
    defaultValues: {
      user_id: '',
      name: '',
      birth_date: '',
      job: '',
      personality: null,
      interest: [],
      hobby: [],
    },
  })

  const mutation = useApiUsersPost()

  const handleSubmit = async () => {
    await userForm.trigger()

    if (userForm.formState.isValid) {
      mutation.mutate({
        data: userForm.getValues(),
      })
    }
  }

  return (
    <div>
      <Form {...userForm}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
        >
          <FormField
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>사용자명</FormLabel>
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
                  <FormLabel>생년월일</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )
            }}
          />
          <FormField
            name="job"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>직업</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )
            }}
          />
          <FormField
            name="personality"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>성격</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )
            }}
          />
          <FormField
            name="hobby"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>관심사</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )
            }}
          />
          <FormField
            name="interest"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>관심사</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )
            }}
          />
          <Button>생성</Button>
        </form>
      </Form>
    </div>
  )
}

export default Page
