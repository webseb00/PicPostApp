import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import siteSettings from './siteSettings'
import user from './user'
import category from './category'
import pinpost from './pinpost'

export default createSchema({
  name: 'SharePic Shema',

  types: schemaTypes.concat([
    siteSettings,
    user,
    category,
    pinpost
  ]),
})
