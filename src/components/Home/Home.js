import { useState } from 'react';
import { SideBar, SearchBar } from '../index'
import { BsList, BsX } from 'react-icons/bs'

const Home = ({ component, searchBar }) => {

  const [sidebar, toggleSidebar] = useState(true);

  return (
    <div className="flex flex-row h-screen">
      <SideBar sidebar={sidebar} />
      <div className={`${!sidebar ? 'ml-[220px] md:ml-[250px]' : ''} flex flex-col bg-gray-50 w-full h-screen overflow-y-scroll disable-scrollbar duration-500 ease-in-out`}>
        <div className={`${searchBar ? 'block' : 'hidden'}`}>
          <SearchBar />
        </div>
        <>{component}</>
      </div>
      <button 
        onClick={() => toggleSidebar(!sidebar)} 
        className="fixed bottom-[10px] right-[10px] rounded-full w-12 h-12 inline-block flex items-center justify-center duration-300 rounded-lg shadow-md hover:shadow-sm bg-white z-10"
      >
        {sidebar ? <BsList className="text-red-500 text-4xl" /> : <BsX className="text-red-500 text-4xl" /> }
      </button>
    </div>
  )
}

export default Home