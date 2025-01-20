import React from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'
import { clsx } from 'clsx'
import styles from '@/blocks/Form/Form.module.scss'

interface UploadFieldProps {
  name: string;
  label: string;
  description?: string;
  fieldDescription?: string;
  required?: boolean;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  register: UseFormRegister<FieldValues>;
  width?: string;
}

export const UploadField: React.FC<UploadFieldProps> = ({
                                                          name,
                                                          label,
                                                          description,
                                                          required,
                                                          errors,
                                                          register,
                                                          width,
                                                          fieldDescription,
                                                        }) => {

  const hasError = !!errors[name]

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <input
        type="file"
        alt={'alt'}
        id={name}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...register(name, { required: required })}
        className={clsx({ [styles.error]: hasError })}
      />
      {fieldDescription && <p className="description">{fieldDescription}</p>}
      {required && errors[name] && <Error />}
    </Width>
  )
}