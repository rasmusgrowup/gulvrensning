import React, { useState, useEffect, useRef } from 'react'
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
  const [preview, setPreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Watch for file selection changes using useEffect
  useEffect(() => {
    const fileInput = fileInputRef.current;

    if (!fileInput) return;

    const handleFileChange = () => {
      const file = fileInput.files?.[0];
      if (file) {
        setPreview(file.name); // Generate a preview URL
      } else {
        setPreview(null); // Clear the preview if no file is selected
      }
    };

    // Listen for changes on the file input
    fileInput.addEventListener('change', handleFileChange);

    // Cleanup the event listener on unmount
    return () => {
      fileInput.removeEventListener('change', handleFileChange);
    };
  }, []); // Empty dependency array ensures this effect runs once


  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <div className={clsx(styles.uploadInputContainer)}>
        <p>Træk og slip fil her, eller </p>
        <div className={clsx(styles.fauxSelectorButton)}>{!preview ? 'Vælg fil' : 'Vælg en anden fil'}</div>
        <Input
          type="file"
          id={name}
          accept={'image/*'}
          aria-invalid={errors[name] ? 'true' : 'false'}
          {...register(name, { required: required })}
          className={clsx({ [styles.error]: hasError })}
          ref={(e) => {
            fileInputRef.current = e; // Assign to custom ref
            register(name).ref(e); // Assign to react-hook-form's register
          }}
        />
        <p className={clsx(styles.fauxSelectorText)}>{preview ? preview : 'Ingen fil valgt'}</p>
      </div>
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