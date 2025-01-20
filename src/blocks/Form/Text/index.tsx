import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { clsx } from 'clsx'

import styles from '../Form.module.scss'

export const Text: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  const hasError = !!errors[name];

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        //defaultValue={defaultValue}
        placeholder={defaultValue}
        id={name}
        type="text"
        {...register(name, { required: requiredFromProps })}
        className={clsx({ [styles.error]: hasError } )}
      />
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
