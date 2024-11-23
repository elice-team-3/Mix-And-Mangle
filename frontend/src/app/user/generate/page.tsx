'use client'

import React, { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import AIGenerator from '@/components/ui/ai-generator'

const Page = () => {
  const router = useRouter()

  const [step1Complete, setStep1Complete] = useState(false)
  const [step2Complete, setStep2Complete] = useState(false)
  const [step3Complete, setStep3Complete] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useLayoutEffect(() => {
    setTimeout(() => {
      setStep1Complete(true)
    }, 2000)
    setTimeout(() => {
      setStep2Complete(true)
    }, 3500)
    setTimeout(() => {
      setStep3Complete(true)
    }, 5500)
    setTimeout(() => {
      setIsComplete(true)
    }, 6000)
  }, [])

  return (
    <AIGenerator
      step1="데이터를 분석하고 있어요."
      step2="프로필을 매칭중이에요."
      step3="거의 다 됐어요!"
      step1Complete={step1Complete}
      step2Complete={step2Complete}
      step3Complete={step3Complete}
      isComplete={isComplete}
      onComplete={() => {
        router.push('/user/complete')
      }}
    />
  )
}

export default Page
