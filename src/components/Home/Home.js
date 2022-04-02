import { SideBar, SearchBar } from '../index'

const Home = () => {
  return (
    <div className="flex flex-row h-screen">
      <SideBar />
      <div className="flex flex-col bg-gray-50 w-full h-screen overflow-y-scroll disable-scrollbar">
        <div>
          <SearchBar />
          <h1>Home component</h1>
        </div>
      </div>
    </div>
  )
}

export default Home