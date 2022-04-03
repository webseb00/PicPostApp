import { useEffect, useState } from 'react';
import { BsArrowUpRightCircleFill, BsSuitHeart, BsSuitHeartFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { client } from '../../utils/client';
import { useStateContext } from '../../context';

const PicPost = ({ item }) => {

  const { _id, title, imageUrl, link, author, save } = item;
  const { userGoogle: { googleId, sanityID } } = useStateContext();

  const [picIsSaved, setPicIsSaved] = useState(false);

  const savePic = e => {
    e.stopPropagation();

    // if(picIsSaved) { 
    //   client.patch(_id).unset([`save`, `save[_ref == "${sanityID}"]`]).commit().then(res => console.log(res))
    //   setPicIsSaved(false);
    // } else {
    //   client
    //   .patch(_id)
    //   .setIfMissing({ save: [] })
    //   .insert('after', 'save[-1]', [
    //     { _key: nanoid(), _ref: sanityID }
    //   ])
    //   .commit()
    //   .then(res => setPicIsSaved(true))
    // }
  }

  return (
    <div className="cursor-pointer mb-5">
      <Link to={`/pic-post/${_id}`}>
        <span className="relative shadow-md hover:shadow-xl duration-300 inline-block rounded-lg">
        <a onClick={savePic} className="p-2 bg-gray-100 rounded-full absolute top-2 right-2 text-xl opacity-60 hover:opacity-100 duration-300">
          {!picIsSaved ? <BsSuitHeart /> : <BsSuitHeartFill />}
        </a>
          <a 
            href={imageUrl} 
            target="_blank"
            onClick={e => e.stopPropagation()}
            className="absolute top-2 left-2 shadow-md bg-gray-100 p-2 rounded-full text-xl opacity-60 hover:opacity-100 duration-300"
          >
            <MdDownloadForOffline />
          </a>
          <a
            onClick={e => e.stopPropagation()} 
            href={link} 
            className="absolute left-2 bottom-2 shadow-md bg-gray-100 p-2 rounded-full text-xl opacity-60 hover:opacity-100 duration-300"
          >
            <BsArrowUpRightCircleFill />
          </a>
          <img src={imageUrl} alt={title} className="rounded-lg" />
        </span>
      </Link>
      <Link to={`/user-profile/${author.googleID}`}>
        <a className="flex items-center flex-start mt-2">
          <img src={author.image} alt={author.full_name} className="w-8 h-8 rounded-full" />
          <p className="ml-2 font-semibold text-l text-gray-500">
            {author.full_name}
          </p>
        </a>
      </Link>
    </div>
  )
}

export default PicPost;