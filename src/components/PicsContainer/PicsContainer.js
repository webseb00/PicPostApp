import { useEffect, useState } from 'react';
import { client } from '../../utils/client';
import { fetchPicsByCategoryID, fetchAllPics } from '../../utils/query';
import { Loader, MasonryContainer } from '../index';
import { BsEmojiSmile } from 'react-icons/bs';
import { useParams, useLocation } from 'react-router-dom';

const PicsContainer = () => {
  const location = useLocation();
  const params = useParams();
  const [pics, setPics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const fetchMethod = params?.slug ? fetchPicsByCategoryID(location.state.id) : fetchAllPics();
    // fetch pics based on given param
    setIsLoading(true);
      client.fetch(fetchMethod)
      .then(res => {
        setPics(res);
        console.log(res);
      })
      .catch(err => console.log(err.message));
    setIsLoading(false);    
  }, [params])

  return (
    <div className="p-3">
      {isLoading ?
        <Loader 
          message={
          <p className="flex flex-col items-center text-xl">
            Be patient we are loading your pics... 
            <BsEmojiSmile className="mt-1 text-3xl" />
          </p>}
        />
        :
        <MasonryContainer items={pics} />    
      } 
    </div>
  )
}

export default PicsContainer;