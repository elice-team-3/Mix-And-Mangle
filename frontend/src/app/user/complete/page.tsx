'use client'

import { motion, AnimatePresence } from 'framer-motion'
import React, { useLayoutEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'

const Page = () => {
  const [step, setStep] = useState(0)

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
      setStep(4)
    }, 6000)
  }, [])

  const { user } = useUserStore()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-50">
      <AnimatePresence>
        {step <= 3 && (
          <div className="flex flex-col items-center justify-center gap-40">
            <motion.div
              className="relative flex h-120 w-120 items-center justify-center"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: 10, transition: { delay: 5.5 } }}
            >
              <motion.img
                src="/icons/spinner.png"
                className="absolute h-120 w-120 animate-spin"
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
              animate={{ opacity: 0, y: 10, transition: { delay: 5.5 } }}
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
              {step < 4 && (
                <div className="flex flex-col">
                  <StepText
                    completed={step >= 1}
                    text="데이터를 분석하고 있어요."
                  />
                  {step >= 1 && (
                    <StepText
                      completed={step >= 2}
                      text="프로필을 매칭중이에요."
                    />
                  )}
                  {step >= 2 && (
                    <StepText completed={step >= 3} text="거의 다 됐어요!" />
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {step === 4 && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.3 } }}
          className="flex flex-col items-center gap-10"
        >
          <img src="/icons/sparkles.png" className="h-120 w-120" alt="" />
          <p className="text-center text-24 font-semibold">
            <strong className="text-primary">{user?.name}</strong>
            님의
            <br />
            AI 분석이 완료되었어요!
            <br />곧 진행될 행사에서 만나요!
          </p>
        </motion.div>
      )}
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
