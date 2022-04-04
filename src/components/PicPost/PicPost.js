import { useState } from 'react';
import { BsArrowUpRightCircleFill, BsTrash } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { client } from '../../utils/client';
import { useStateContext } from '../../context';

const PicPost = ({ item }) => {

  const { _id, title, imageUrl, link, author, save } = item;
  const { userGoogle: { googleId, sanityID } } = useStateContext();

  const deletePic = e => {
    e.preventDefault();

    client
      .delete(_id)
      .then(() => {
        window.location.reload();
      })
      .catch(err => console.log(err.message));
  }

  return (
    <div className="cursor-pointer mb-5">
      <Link to={`/pic-post/${_id}`}>
        <span className="relative shadow-md hover:shadow-xl duration-300 inline-block rounded-lg">
          {author._id === sanityID ? (
            <span onClick={deletePic} className="p-2 bg-gray-100 rounded-full absolute top-2 right-2 text-xl opacity-60 hover:opacity-100 duration-300">
              <BsTrash />
            </span>
          ) : ''}
          <span 
            href={imageUrl} 
            target="_blank"
            onClick={e => e.stopPropagation()}
            className="absolute top-2 left-2 shadow-md bg-gray-100 p-2 rounded-full text-xl opacity-60 hover:opacity-100 duration-300"
          >
            <MdDownloadForOffline />
          </span>
          <span
            onClick={e => e.stopPropagation()} 
            href={link} 
            className="absolute left-2 bottom-2 shadow-md bg-gray-100 p-2 rounded-full text-xl opacity-60 hover:opacity-100 duration-300"
          >
            <BsArrowUpRightCircleFill />
          </span>
          <img src={imageUrl} alt={title} className="rounded-lg" />
        </span>
      </Link>
      <Link to={`/user-profile/${author.googleID}`} className="flex items-center flex-start mt-2">
        <img src={author.image} alt={author.full_name} className="w-8 h-8 rounded-full" />
        <p className="ml-2 font-semibold text-l text-gray-500">
          {author.full_name}
        </p>
      </Link>
    </div>
  )
}

export default PicPost;