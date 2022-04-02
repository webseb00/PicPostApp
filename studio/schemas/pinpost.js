import { TiPin } from 'react-icons/ti'

export default {
  name: 'pinpost',
  title: 'PinPost',
  type: 'document',
  icon: TiPin,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'string'
    }, 
    {
      name: 'link',
      title: 'Link',
      type: 'url'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      initialValue: (new Date()).toISOString()
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'user' }]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'reference',
      to: [{ type: 'category' }]
    },
    {
      name: 'save',
      title: 'Save',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'user' }]  
      }]
    }
  ]
}