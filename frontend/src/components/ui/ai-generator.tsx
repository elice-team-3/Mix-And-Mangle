'use client'

import { motion } from 'framer-motion'
import React, { useEffect } from 'react'

import { cn } from '@/lib/utils'

interface Props {
  step1: string
  step1Complete?: boolean
  step2: string
  step2Complete?: boolean
  step3: string
  step3Complete?: boolean
  isComplete?: boolean
  onComplete?: () => void
}

const AIGenerator = ({
  step1,
  step2,
  step3,
  isComplete,
  onComplete,
  step1Complete = false,
  step2Complete = false,
  step3Complete = false,
}: Props) => {
  // const [step, setStep] = useState(0)

  useEffect(() => {
    if (isComplete) {
      onComplete && onComplete()
    }
  }, [isComplete, onComplete, step1Complete, step2Complete, step3Complete])

  return (
    <>
      <img
        src="/images/gradient.png"
        alt=""
        className="fixed left-0 top-0 h-full w-full"
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-50">
        <div className="flex flex-col items-center justify-center gap-40">
          <motion.div
            className="relative flex h-120 w-120 items-center justify-center"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
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
              animate={{ y: 0, opacity: 1 }}
              src="/icons/sparkles.png"
              className="h-60 w-60"
              alt=""
            />
          </motion.div>
          <motion.div
            className="flex flex-col items-center gap-10"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
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
              <StepText completed={step1Complete} text={step1} />
              {step1Complete && (
                <StepText completed={step2Complete} text={step2} />
              )}
              {step2Complete && (
                <StepText completed={step3Complete} text={step3} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
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

export default AIGenerator
