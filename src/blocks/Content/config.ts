import type { Block, Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    name: 'blockType',
    type: 'select',
    label: 'Column Type',
    required: true,
    options: [
      { label: 'Text', value: 'text' },
      { label: 'Image & Text', value: 'image' },
      { label: 'Video & Text', value: 'video' },
      { label: 'Card', value: 'card' },
    ],
    admin: {
      description: 'Select the type of content for this column.',
    },
  },
  {
    name: 'changeLayout',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => siblingData.blockType === 'text', // Only show for text type
      description: 'Change the layout to be centered, instead of columnized',
    },
  },
  {
    name: 'heading',
    type: 'text', // Title field for the block
    label: 'Heading',
    admin: {
      description: 'Add a heading for this content block.',
      placeholder: 'Nice big heading...',
    },
  },
  {
    name: 'size',
    type: 'select',
    defaultValue: 'full',
    options: [
      {
        label: 'One Sixth',
        value: 'oneSixth',
      },
      {
        label: 'One Quarter',
        value: 'oneQuarter',
      },
      {
        label: 'One Third',
        value: 'oneThird',
      },
      {
        label: 'Half',
        value: 'half',
      },
      {
        label: 'Two Thirds',
        value: 'twoThirds',
      },
      {
        label: 'Full',
        value: 'full',
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        condition: (_, { enableLink }) => Boolean(enableLink),
      },
    },
  }),
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => siblingData.blockType === 'image' || siblingData.blockType === 'card', // Only show for image type
    },
  },
  {
    name: 'overlay',
    type: 'checkbox',
    label: 'Include an overlay for the image, to make the text easier to read',
    admin: {
      condition: (_, siblingData) => siblingData.blockType === 'card', // Only show for image type
    },
  },
  {
    name: 'videoUrl',
    type: 'text',
    label: 'Video URL',
    admin: {
      condition: (_, siblingData) => siblingData.blockType === 'video', // Only show for video type
      placeholder: 'Enter the video URL...',
    },
  },
]

export const Content: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description: 'Add a title for this content block.',
        placeholder: 'Enter a title...',
      },
    },
    {
      name: 'columns',
      type: 'array',
      fields: columnFields,
    },
  ],
}
