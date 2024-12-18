import * as React from 'react'
import { clsx } from 'clsx'
import styles from '../Form.module.scss'

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div className={clsx(className, styles.field)} style={{ width: width ? `calc(${width}% - 1rem)` : undefined }}>
      {children}
    </div>
  )
}
