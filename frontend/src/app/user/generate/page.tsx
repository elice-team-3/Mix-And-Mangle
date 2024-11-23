'use client'

import { motion } from 'framer-motion'
import React, { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'

const Page = () => {
  const [step, setStep] = useState(0)
  const router = useRouter()

  useLayoutEffect(() => {
    setTimeout(() => {
      setStep(1)
    }, 2000)
    setTimeout(() => {
      setStep(2)
    }, 3500)
    setTimeout(() => {
      setStep(3)
    }, 5500)
    setTimeout(() => {
      router.push('/user/complete')
    }, 6000)
  }, [])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-50">
      <div className="flex flex-col items-center justify-center gap-40">
        <motion.div
          className="relative flex h-120 w-120 items-center justify-center"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 0, y: 10, transition: { delay: 5.8 } }}
        >
          <motion.img
            src="/icons/spinner.png"
            className="absolute h-120 w-120 animate-spin"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            alt=""
          />
          <motion.img
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
            src="/icons/sparkles.png"
            className="h-60 w-60"
            alt=""
          />
        </motion.div>
        <motion.div
          className="flex flex-col items-center gap-10"
          initial={{ opacity: 1, y: 10 }}
          animate={{ opacity: 0, y: 10, transition: { delay: 5.8 } }}
          exit={{ opacity: 0, y: 10 }}
        >
          <span className="text-center text-24 font-semibold">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              잠시만 기다려주세요!
              <br />
              AI 분석중이에요.
            </motion.p>
          </span>
          <div className="flex flex-col">
            <StepText completed={step >= 1} text="데이터를 분석하고 있어요." />
            {step >= 1 && (
              <StepText completed={step >= 2} text="프로필을 매칭중이에요." />
            )}
            {step >= 2 && (
              <StepText completed={step >= 3} text="거의 다 됐어요!" />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function StepText({ completed, text }: { completed: boolean; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex items-center gap-4', completed && 'opacity-80')}
    >
      {completed ? (
        <img src="/icons/check-fill.png" className="h-16 w-16" alt="" />
      ) : (
        <img
          src="/icons/spinner.png"
          className="h-16 w-16 animate-spin"
          alt=""
        />
      )}
      <p>{text}</p>
    </motion.div>
  )
}

export default Page
