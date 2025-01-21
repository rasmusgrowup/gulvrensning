'use client'
import type { Form as FormType } from '@payloadcms/plugin-form-builder/types'
import payload from 'payload'; // Import the Payload SDK

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import styles from './Form.module.scss'

import { buildInitialFormState } from './buildInitialFormState'
import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { clsx } from 'clsx'

export type Value = unknown

export interface Property {
  [key: string]: Value
}

export interface Data {
  [key: string]: Property | Property[]
}

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: {
    [k: string]: unknown
  }[]
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: buildInitialFormState(formFromProps.fields),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    async (data: Data) => {
      console.log('Form submission started:', data); // Log the initial form data
      setError(undefined);
      setIsLoading(true);

      try {
        const submissionData = await Promise.all(
          Object.entries(data).map(async ([name, value]) => {
            console.log(`Processing field: ${name}`, value); // Log each field being processed

            // Check if the field is a file input
            if (name === 'upload' && value instanceof FileList && value.length > 0) {
              const file = value[0]; // Get the first file
              console.log(`File detected in field ${name}:`, file);

              // Create the metadata for the file
              const altValue = `Uploaded file: ${file.name}-${Date.now()}`;
              const captionValue = {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'text',
                      text: `Caption for ${file.name}`,
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1,
                },
              };

              const formData = new FormData();
              formData.append('file', file); // Append the file
              formData.append("_payload", JSON.stringify({ alt: altValue }));
              //formData.append("_payload", JSON.stringify({ caption: captionValue }));

              console.log('FormData contents:');
              formData.forEach((value, key) => {
                console.log(`${key}:`, value);
              });

              console.log('Uploading file via REST API...');

              // Upload the file directly to the Media collection using the REST API
              const uploadResponse = await fetch('/api/media', {
                method: 'POST',
                body: formData,
              });

              if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                console.error(`File upload failed for field ${name}:`, errorText);
                throw new Error(`File upload failed for field ${name}`);
              }

              const mediaData = await uploadResponse.json();
              console.log(`File uploaded successfully for field ${name}:`, mediaData);

              // Extract id and url from the response
              const { id, url } = mediaData.doc;
              const absoluteUrl = `${getClientSideURL()}${url}`;

              // Return the field with uploaded file data
              return {
                field: name,
                value: {
                  id,
                  url: absoluteUrl,
                  //alt: altValue,
                },
              };
            }

            // Handle non-file fields
            console.log(`Non-file field detected: ${name}`);
            return {
              field: name,
              value,
            };
          })
        );

        console.log('Final submission data:', submissionData); // Log the processed submission data

        // Submit the form data to Payload CMS
        const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            form: formID,
            submissionData,
          }),
        });

        if (!req.ok) {
          const errorText = await req.text();
          console.error('Form submission failed:', errorText);
          throw new Error('Form submission failed');
        }

        const res = await req.json();
        console.log('Form submission successful:', res);

        setIsLoading(false);
        setHasSubmitted(true);

        // Handle redirect or confirmation
        if (confirmationType === 'redirect' && redirect?.url) {
          console.log('Redirecting to:', redirect.url);
          router.push(redirect.url);
        }
      } catch (err) {
        console.error('Error during form submission:', err);
        setIsLoading(false);
        setError({ message: err.message || 'Something went wrong.' });
      }
    },
    [formID, confirmationType, redirect, router]
  );

  return (
    <div className={styles.formBlock}>
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className={styles.formIntroContent} content={introContent} enableGutter={false} />
      )}
      <div className={styles.formContainer}>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText content={confirmationMessage} />
          )}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form className={styles.form} id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formFields}>
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    const Field: React.FC<any> = fields?.[field.blockType]
                    if (Field) {
                      return (
                        <Field
                          key={index}
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {isLoading && !hasSubmitted ? 'Behandler ...' : submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
