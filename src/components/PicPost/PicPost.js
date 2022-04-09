import { useState, useEffect } from 'react';
import { BsArrowUpRightCircleFill, BsTrash, BsHeartFill, BsHeart } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import { client } from '../../utils/client';
import { useStateContext } from '../../context';
import { toast } from 'react-toastify';

const PicPost = ({ item }) => {

  const { _id, title, imageUrl, link, author, save } = item;
  const { userGoogle: { sanityID } } = useStateContext();

  const [savedPicture, setSavedPicture] = useState(false);

  const toastSuccess = msg => toast.success(msg);

  useEffect(() => {
    const checkIfSaved = save?.filter(el => el._ref === sanityID);
    if(checkIfSaved?.length) setSavedPicture(true);
  }, [item]);

  const savePic = (e, picID) => {
    e.preventDefault();

    const findPic = save?.filter(el => el._ref === sanityID);

    if(findPic?.length) {
      client
        .patch(_id)
        .unset([`save[_ref=="${sanityID}"]`])
        .commit()
        .then(() => {
          setSavedPicture(false);
          toastSuccess('Post has been unsaved!');
        })
    } else {
      client
        .patch(picID)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{ _key: nanoid(), _ref: sanityID }])
        .commit()
        .then(() => {
          setSavedPicture(true);
          toastSuccess('Post has been saved!');
        });
    }
  }

  const deletePic = e => {
    e.preventDefault();
    client
      .delete(_id)
      .then(() => window.location.reload())
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
          <button 
            type="button" 
            className="absolute right-2 bottom-2 text-2xl border rounded-full p-2 bg-gray-100 opacity-60 hover:opacity-100 duration-300"
            onClick={e => savePic(e, _id)}
          >
            {!savedPicture ? <BsHeart className="text-red-500" /> : <BsHeartFill className="text-red-500" />}
          </button>
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