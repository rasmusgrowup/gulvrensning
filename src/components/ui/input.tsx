import { cn } from 'src/utilities/cn'
import * as React from 'react'

import styles from './ui.module.scss'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, ...props }, ref) => {


    return (
      <input
        className={cn(
          styles.input,
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export { Input }
