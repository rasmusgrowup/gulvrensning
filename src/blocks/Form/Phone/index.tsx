import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { clsx } from 'clsx'
import styles from '@/blocks/Form/Form.module.scss'

const PhoneBlock = {
  slug: 'phone', // unique identifier for the block
  labels: {
    singular: 'Phone Number',
    plural: 'Phone Numbers',
  },
  fields: [
    {
      name: 'name', // Label for the upload field
      type: 'text',
      label: 'Name (lowercase, no special characters)',
      required: true,
    },
    {
      name: 'label', // Label for the upload field
      type: 'text',
      label: 'Label',
      required: true,
    },
    {
      name: 'placeholder',
      type: 'text',
      label: 'Placeholder',
    },
    {
      name: 'width',
      type: 'number',
    }
  ],
};

export default PhoneBlock;

export const Phone: React.FC<
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
        defaultValue={defaultValue}
        id={name}
        type="phone"
        {...register(name, { pattern: /^\+45\s?-?\d{2}\s?-?\d{2}\s?-?\d{2}\s?-?\d{2}$|^\d{8}$/, required: requiredFromProps })}
        className={clsx({ [styles.error]: hasError } )}
      />
      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
