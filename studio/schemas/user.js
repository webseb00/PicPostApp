import { FaUser } from 'react-icons/fa';

export default {
  name: 'user',
  title: 'User',
  type: 'document',
  icon: FaUser, 
  fields: [
    {
      name: 'full_name',
      title: 'Full Name',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image URL',
      type: 'string'
    },
    {
      name: 'googleID',
      title: 'Google ID',
      type: 'string'
    }
  ]
}