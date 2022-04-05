import { useEffect, useState } from 'react';
import { SideBar, SearchBar } from '../index'



const Home = ({ component, searchBar }) => {

  const [sidebar, toggleSidebar] = useState(false);

  return (
    <div className="flex flex-row h-screen">
      <SideBar sidebar={sidebar} />
      <div className={`${!sidebar ? 'ml-[220px] md:ml-[250px]' : ''} flex flex-col bg-gray-50 w-full h-screen overflow-y-scroll disable-scrollbar duration-500 ease-in-out`}>
        <div className={`${searchBar ? 'block' : 'hidden'}`}>
          <SearchBar handleSidebar={toggleSidebar} sidebar={sidebar} />
        </div>
        <>{component}</>
      </div>
    </div>
  )
}

export default Home