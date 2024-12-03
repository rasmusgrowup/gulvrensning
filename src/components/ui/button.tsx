import React from 'react';
import clsx from 'clsx';
import { Slot } from '@radix-ui/react-slot';

import styles from './ui.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'default' | 'destructive' | 'ghost' | 'link' | 'outline' | 'secondary';
  size?: 'clear' | 'default' | 'icon' | 'lg' | 'sm';
}

// Use Record to strictly type the variant and size keys
const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default: styles['variants-default'],
  destructive: styles['variants-destructive'],
  ghost: styles['variants-ghost'],
  link: styles['variants-link'],
  outline: styles['variants-outline'],
  secondary: styles['variants-secondary'],
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  clear: styles['sizes-clear'],
  default: styles['sizes-default'],
  icon: styles['sizes-icon'],
  lg: styles['sizes-lg'],
  sm: styles['sizes-sm'],
};

const buttonVariants = ({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: NonNullable<ButtonProps['variant']>;
  size?: NonNullable<ButtonProps['size']>;
  className?: string;
}) => clsx(
  styles.button, // Base button styles
  variantClasses[variant], // Variant-specific styles
  sizeClasses[size], // Size-specific styles
  className, // Custom className passed by user
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild = false, className, variant = 'default', size = 'default', ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };