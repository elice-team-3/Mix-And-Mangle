import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'>
>(({ className, ...props }, ref) => {
  return (
    <div className="relative">
      <textarea
        className={cn(
          'w-full rounded-lg border border-[#CAC1E1] bg-white p-12 outline-none focus:border-primary',
          className,
        )}
        ref={ref}
        {...props}
      />
      <span className="absolute bottom-12 right-12">
        {props.value ? props.value.toString().length : 0}/{props.maxLength || 0}
      </span>
    </div>
  )
})
Textarea.displayName = 'Textarea'

export { Textarea }
