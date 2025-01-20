import React, { useState } from 'react'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Error } from '../Error'
import { Width } from '../Width'
import { clsx } from 'clsx'
import styles from '@/blocks/Form/Form.module.scss'
import { Input } from '@/components/ui/input'

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
  //const [preview, setPreview] = useState<string | null>(null);

  /*
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      setPreview(URL.createObjectURL(file)); // Generate a preview URL
    } else {
      setPreview(null); // Clear the preview if no file is selected
    }
  };
   */

  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        id={name}
        aria-invalid={errors[name] ? 'true' : 'false'}
        {...register(name, { required: required })}
        className={clsx({ [styles.error]: hasError })}
      />
      {/*
        {preview && (
          <div className={styles.previewContainer}>
            <img
              src={preview}
              alt="Preview of the uploaded file"
              className={styles.imagePreview}
            />
          </div>
        )}
      */}
      {fieldDescription &&
        <p
          className="description"
          style={{ marginTop: '1rem', color: 'var(--grey)' }}
        >
          {fieldDescription}
        </p>
      }
      {required && errors[name] && <Error />}
    </Width>
  )
}