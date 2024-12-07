import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Footer Logo',
      required: true,
      admin: {
        description: 'Upload the logo for the footer.',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      admin: {
        description: 'Enter a contact email address',
      },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Phone Number',
      admin: {
        description: 'Enter a contact phone number',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: {
        description: 'Enter a description',
      },
    },
    {
      name: 'address',
      type: 'richText',
      label: 'Company Address',
      admin: {
        description: 'Enter an address',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
