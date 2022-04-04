import { useEffect, useState } from 'react';
import { client } from '../../utils/client';
import { fetchPicsByCategoryID, fetchAllPics } from '../../utils/query';
import { Loader, MasonryContainer } from '../index';
import { BsEmojiSmile } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';

const PicsContainer = () => {
  const location = useLocation();
  const [pics, setPics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTodos = async () => {
    const fetchMethod = location.state?.id ? fetchPicsByCategoryID(location.state.id) : fetchAllPics();
    const data = await client.fetch(fetchMethod);
    setPics(data);

    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchTodos();
  }, [location]);

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