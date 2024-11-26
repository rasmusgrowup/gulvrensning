import type { GlobalConfig } from 'payload';

export const Logo: GlobalConfig = {
  slug: 'logo',
  label: 'Logo',
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Logo Image',
    },
    {
      name: 'alt',
      type: 'text',
      label: 'Alt Text',
      required: true,
    },
  ],
};