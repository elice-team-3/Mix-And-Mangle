import React from 'react'

import { cn } from '@/lib/utils'

interface StepperProps {
  maxSteps: number
  currentStep: number
}

const Stepper = ({ maxSteps, currentStep }: StepperProps) => {
  const steps = Array.from({ length: maxSteps }, (_, i) => i + 1)

  return (
    <div className="mb-24 flex w-full gap-12">
      {steps.map((step) => (
        <div
          key={step}
          className={cn(
            'h-12 w-full rounded-full transition-colors duration-300',
            step <= currentStep ? 'bg-primary' : 'bg-[#DBDBDB]',
          )}
        />
      ))}
    </div>
  )
}

export default Stepper
