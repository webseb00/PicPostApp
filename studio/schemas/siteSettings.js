import { FaCog } from 'react-icons/fa';

export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: FaCog,
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
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    }
  ]
}