import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Logout, MasonryContainer } from "../index";
import { client } from '../../utils/client';
import { fetchPicsByUserID, fetchSavedPicsByUser, fetchUserQuery } from '../../utils/query';
import { Loader } from '../../components/index';
import { useStateContext } from '../../context';

const UserProfile = () => {

  const { id } = useParams();

  const [active, setActive] = useState('created');
  const [items, setItems] = useState(null);
  const [backgroundUrl, setBackgroundUrl] = useState('');

  const [userProfile, setUserProfile] = useState(null);


  useEffect(() => {
    client.fetch(fetchUserQuery(id))
      .then(res => setUserProfile(...res));

    fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_API_ACCESS_KEY}`)
      .then(res => res.json())
      .then(data => setBackgroundUrl(data.urls.regular))
  }, []);

  useEffect(() => {
    // fetch pics CREATED by the user
    if(userProfile?._id) {
      if(active === 'created') {
        client.fetch(fetchPicsByUserID(userProfile._id))
          .then(res => {
            console.log(res);
            setItems(res);
          })
          .catch(err => console.log(err.message));
      } else {
        //fetch pics SAVED by the user
        client.fetch(fetchSavedPicsByUser(userProfile._id))
          .then(res => {
            console.log(res);
            setItems(res);
          })
          .catch(err => console.log(err.message));
      }
    }
  }, [active, userProfile]);

  if(!userProfile || !items) return <Loader />;

  return (
    <div className="relative">
      <div className="absolute top-1 right-1">
        <Logout />
      </div>
      <div className="h-96 shadow-lg relative">
        <img src={backgroundUrl} className="h-full w-full object-cover" />
        <img src={userProfile?.image} alt={userProfile?.full_name} className="w-20 h-20 absolute -bottom-8 left-2/4 -translate-x-2/4 shadow-lg rounded-full" />
      </div>
      <h1 className="font-semibold text-center text-3xl mt-10 mb-3">{userProfile?.full_name}</h1>
      <div className="flex justify-center my-6">
        <button 
          type="button"
          onClick={() => setActive('created')}
          className={`${active === 'created' ? 'bg-red-500 text-white' : ''} mx-2 py-1 px-6 rounded-full border-2 border-red-500 font-semibold text-l`}
        >
          Created
        </button>
        <button 
          type="button"
          onClick={() => setActive('saved')}
          className={`${active === 'saved' ? 'bg-red-500 text-white' : ''} mx-2 py-1 px-6 rounded-full border-2 border-red-500 font-semibold text-l`}
        >
          Saved
        </button>
      </div>
      <div className="mt-8 mb-2 p-3">
        {items?.length !== 0 ? <MasonryContainer items={items} /> : <p className="text-center font-semibold text-xl">No pics found!</p>}
      </div>
    </div> 
  )
}

export default UserProfile;