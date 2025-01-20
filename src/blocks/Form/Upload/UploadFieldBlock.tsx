// blocks/UploadFieldBlock.js
const UploadFieldBlock = {
  slug: 'uploadField', // unique identifier for the block
  labels: {
    singular: 'Upload Field',
    plural: 'Upload Fields',
  },
  fields: [
    {
      name: 'name', // Label for the upload field
      type: 'text',
      defaultValue: 'upload',
      label: 'Name (read only)',
      admin: {
        readOnly: true, // Lock the field
      },
    },
    {
      name: 'label', // Label for the upload field
      type: 'text',
      label: 'Label',
      required: true,
    },
    {
      name: 'fieldDescription',
      type: 'textarea',
      label: 'Field Description',
    },
    {
      name: 'width',
      type: 'number',
    }
  ],
};

export default UploadFieldBlock;