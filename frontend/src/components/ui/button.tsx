import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'rounded-12 inline-flex items-center justify-center [&>span]:font-medium whitespace-nowrap transition-colors ',
  {
    variants: {
      variant: {
        default: 'bg-primary [&>span]:text-white',
        secondary:
          'bg-white [&>span]:text-primary border-[1px] border-primary border-solid',
        tertiary: 'bg-[#E4DCFF] [&>span]:text-primary',
        dark: 'bg-[#201F27] [&>span]:text-white',
      },
      size: {
        default: 'py-16 text-18 px-26',
        sm: 'py-9 px-14 text-14',
      },
      fit: {
        true: 'w-fit',
        false: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      fit: false,
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span>{children}</span>
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
