import { useState } from 'react';
import { Link } from 'react-router-dom'
import { BsPlus } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { useStateContext } from '../../context';

const SearchBar = () => {

  const { userGoogle: { name, imageUrl, googleId } } = useStateContext();
  const [term, setTerm] = useState('');
  
  const handleSearchTerm = e => {
    setTerm(e.target.value);
  }

  return (
    <div className="flex p-3 gap-3">
      <div className="w-full">
        <div className="flex items-center rounded-lg bg-white p-3">
          <AiOutlineSearch className="mx-2 text-2xl" />
          <input 
            type="text" 
            name="search" 
            value={term} 
            onChange={handleSearchTerm} 
            placeholder="Search..." 
            className="w-full border-none outline-none" 
          />
        </div>
      </div>
      <div className="flex justify-between gap-3">
        <Link to={`/user-profile/${googleId}`} className="w-12 h-12 inline-block hover:shadow-md duration-300">
          <img src={imageUrl} alt={name} className="rounded-lg" />
        </Link>
        <Link to="/create-pic" className="w-12 h-12 rounded-lg inline-block bg-slate-900 flex items-center justify-center hover:shadow-md duration-300">
          <BsPlus className="text-white text-2xl" />
        </Link>
      </div>
    </div>
  )
}

export default SearchBar;