import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { QuizResponse } from '@/services/api.schemas'
import { cn } from '@/lib/utils'

import { SECOND_PER_QUIZ } from '../Quiz'

const QuizBlock = ({ quiz }: { quiz: QuizResponse }) => {
  const [showAnswer, setShowAnswer] = useState(false)

  useEffect(() => {
    setTimeout(
      () => {
        setShowAnswer(true)
      },
      1000 * (SECOND_PER_QUIZ - 5),
    )
  }, [quiz])

  useEffect(() => {
    setShowAnswer(false)
  }, [quiz])

  return (
    <motion.div
      key={quiz.question}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex w-full flex-col gap-24"
    >
      <div className="flex items-center justify-center rounded-12 border-2 border-solid border-[#CAC1E1] bg-white px-10 py-20">
        <div className="break-keep text-center text-20 font-semibold text-[#40297e]">
          {quiz.question}
        </div>
      </div>
      <div className="flex flex-col gap-12">
        {quiz.options.map((option, idx) => (
          <motion.div
            key={option}
            initial={{ scale: 1 }}
            className={cn(
              'flex items-center gap-12 rounded-8 border-2 border-solid border-white bg-primary px-12 py-24 transition-all duration-300',
              showAnswer && quiz.answer === option && 'bg-[#34C481]',
            )}
          >
            <div className="h-24 w-24 rounded-4 bg-white text-center text-16">
              {idx + 1}
            </div>
            <div className="text-20 font-medium text-white">{option}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default QuizBlock
