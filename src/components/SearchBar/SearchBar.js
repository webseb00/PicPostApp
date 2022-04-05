import { useState } from 'react';
import { Link } from 'react-router-dom'
import { BsPlus, BsList, BsX } from 'react-icons/bs'
import { AiOutlineSearch } from 'react-icons/ai'
import { useStateContext } from '../../context';

const SearchBar = ({ handleSidebar, sidebar }) => {

  const { userGoogle: { name, imageUrl, googleId } } = useStateContext();
  const [term, setTerm] = useState('');
  
  const handleSearchTerm = e => {
    setTerm(e.target.value);
  }

  const handleToggle = () => handleSidebar(!sidebar);

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
        <button onClick={handleToggle} className="w-12 h-12 inline-block flex items-center justify-center hover:shadow-md duration-300 rounded-lg bg-sky-600">
          {sidebar ? <BsList className="text-white text-4xl" /> : <BsX className="text-white text-4xl" /> }
        </button>
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