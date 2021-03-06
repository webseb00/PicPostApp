import { useState, useEffect } from 'react';
import { MdDownloadForOffline, MdOutlineHighlightOff } from 'react-icons/md';
import { RiLoader4Fill } from 'react-icons/ri';
import { client } from '../../utils/client';
import { fetchPicDetailsQuery } from '../../utils/query';
import { Loader } from '../index';
import { Link, useParams } from 'react-router-dom';
import { useStateContext } from '../../context';
import { toast } from 'react-toastify';

const PicPostDetails = () => {

  const params = useParams();
  const [pic, setPic] = useState(null);

  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState('');
  const [loading, setLoading] = useState(false);

  const toastInfo = msg => toast.info(msg);

  const { userGoogle: { sanityID, imageUrl, name, googleId } } = useStateContext();

  useEffect(() => {
    // fetch pic post details
    client.fetch(fetchPicDetailsQuery(params.id))
      .then(res => {
        setPic(res[0]);
        setComments(res[0].comments);
      })
      .catch(err => console.log(err.message));
    }, [params.id]);

  const handleSubmit = e => {
    e.preventDefault();

    if(inputComment) {
      setLoading(true);

      client
      .patch(pic._id)
      .setIfMissing({ comments: [] })
      .insert('after', 'comments[-1]', [{ comment: inputComment, 
                                          author: { author_ref: { _type: 'reference', _ref: sanityID }, full_name: name, image: imageUrl, googleID: googleId } }])
      .commit({
        autoGenerateArrayKeys: true,
      }).then(res => {
        setComments(res.comments);
        setInputComment('');
        toastInfo('Your comment has been added!')
        setLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setLoading(false);
      })
    }
  }

  const handleDeleteComment = async commentID => {
    const confirm = window.confirm('Are you sure you want to remove comment?');

    if(confirm) {
      const { comments } = await client.patch(params.id).unset([`comments[_key=="${commentID}"]`]).commit();
      setComments(comments);
    }
  }

  const handleChange = e => setInputComment(e.target.value);

  if(!pic) return <Loader message={<p className="text-center">Loading details...</p>} />;

  return (
    <div className="p-3 my-3 flex justify-center">
      <div className="w-10/12 flex flex-col md:w-8/12 lg:w-10/12 lg:flex-row bg-white rounded-2xl max-w-screen-xl">
        <div className="w-full lg:w-2/5">
          <img src={pic.imageUrl} alt={pic.title} className="rounded-2xl object-cover" />
        </div>
        <div className="w-full lg:w-3/5 p-4">
          <div className="flex justify-between">
            <a 
              href={pic.imageUrl} 
              target="_blank"
              download
              className="shadow-md p2 bg-gray-100 p-2 rounded-full text-xl opacity-60 hover:opacity-100 duration-300"
            >
              <MdDownloadForOffline />
            </a>
            <a href={pic.link} target="_blank">{pic.link}</a>
          </div>
          <div className="my-4">
            <h1 className="font-bold mb-3 text-3xl">{pic.title}</h1>
            <p className="text-xl">{pic.description}</p>
          </div>
          <div className="mb-6">
            <Link to={`/user-profile/${pic?.author.googleID}`} className="flex items-center">
              <img src={pic?.author.image} alt={pic?.author.full_name} className="w-11 h-11 rounded-full" />
              <p className="font-semibold ml-2">{pic?.author.full_name}</p>
            </Link>
          </div>
          <div className="py-2 border-t">
            <h2 className="text-2xl font-semibold mb-4">Comments:</h2>
            {!comments?.length ? 
            <h4 className="text-lg my-4">No comments found...</h4> : 
            <ul className="mb-4 rounded-lg divide-y divide-gray-300 max-h-40 overflow-y-auto disable-scrollbar">
              {comments?.length && comments.map(el => {
                const { _key, comment, author: { googleID, image, full_name } } = el;
                return (
                  <li key={_key} className="flex flex-1 py-2 mb-2 items-center relative">
                    {googleID === googleId ? 
                      <button 
                        type="button" 
                        onClick={() => handleDeleteComment(_key)}
                        className="absolute top-2 right-2"
                      >
                        <MdOutlineHighlightOff className="text-2xl text-red-500 opacity-60 hover:opacity-100 duration-300" />
                      </button>
                      : ''
                    }
                    <a href={`/user-profile/${googleID}`}>
                      <img src={image} className="w-11 h-11 rounded-full" alt="avatar" />
                    </a>
                    <div className="ml-2 flex flex-col justify-center">
                      <h4 className="font-semibold">{full_name}</h4>
                      <p>{comment}</p>
                    </div>
                  </li>
                )
              })}
            </ul>}
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center mt-6">
              <img src={imageUrl} className="w-11 h-11 rounded-full" alt="avatar" />
              <input 
                type="text" 
                value={inputComment}
                onChange={handleChange}
                placeholder="Add your comment here..." 
                className="border border-gray-300 rounded-lg p-2 flex-1 text-center mx-3 my-3 w-full"
                required 
              />
              <button 
                type="submit" 
                disabled={loading}
                className="rounded-lg shadow-md outline-none border-2 border-solid border-sky-600 bg-sky-600 duration-300 cursor-pointer text-white py-2 px-6 text-md hover:bg-transparent hover:text-sky-600 font-semibold flex items-center">
                  {loading ? 
                    <>
                      <RiLoader4Fill className="animate-spin mr-2 text-2xl" />
                      Sending...
                    </>
                    :
                    <p>Submit</p>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PicPostDetails;