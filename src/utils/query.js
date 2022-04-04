export const fetchUserQuery = param => {
  const query = `*[_type == 'user' && googleID == '${param}']{ _id, full_name, image, googleID }`;
  return query;
}

export const fetchCategoriesQuery = () => {
  const query = `*[_type == 'category']{ _id, title, 'imageUrl': thumbnail.asset->url, slug }`;
  return query;
}

export const fetchAllPics = () => {
  const query = `*[_type == 'pinpost'] | order(_createdAt desc) { _id, title, 'imageUrl': image.asset->url, author->, link, save }`;
  return query;
}

export const fetchPicsByCategoryID = param => {
  const query = `*[_type == 'pinpost' && categories._ref == '${param}'] | order(_createdAt desc) { _id, title, 'imageUrl': image.asset->url, author->, link, save }`;
  return query;
}

export const fetchPicsByUserID = param => {
  const query = `*[_type == 'pinpost' && author->_id == '${param}'] | order(_createdAt desc) { _id, title, 'imageUrl': image.asset->url, author->, link, save }`;
  return query;
}

export const fetchSavedPicsByUser = param => {
  const query = `*[_type == 'pinpost' && '${param}' in save[]._ref] | order(_createdAt desc) { _id, title, 'imageUrl': image.asset->url, author->, link, save }`;
  return query;
}

export const fetchPicDetailsQuery = param => {
  const query = `*[_type == 'pinpost' && _id == '${param}']{ _id, title, link, description, 'category_slug': categories->slug.current, 'category_id': categories->_id ,author->, 'imageUrl': image.asset->url, comments }`;
  return query;
}