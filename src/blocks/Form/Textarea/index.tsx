import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { clsx } from 'clsx'
import styles from '@/blocks/Form/Form.module.scss'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
}) => {
  const hasError = !!errors[name];

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>

      <TextAreaComponent
        //defaultValue={defaultValue}
        placeholder={defaultValue}
        id={name}
        rows={rows}
        {...register(name, { required: requiredFromProps })}
        className={clsx({ [styles.error]: hasError } )}
      />

      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
