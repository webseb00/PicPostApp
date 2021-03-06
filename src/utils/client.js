import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-03-25', // use current UTC date - see "specifying API version"!
  token: process.env.REACT_APP_SANITY_PROJECT_TOKEN, // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
})