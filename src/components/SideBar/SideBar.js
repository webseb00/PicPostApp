import { BsCameraFill, BsFillBookmarkFill, BsCaretRight } from 'react-icons/bs';
import styles from './SideBar.module.css';
import { Link } from 'react-router-dom';
import { useStateContext } from '../../context';

const SideBar = () => {
  const { categories, userGoogle } = useStateContext();
  const { name, imageUrl, googleId } = userGoogle;
  
  return (
    <div className="h-screen w-[290px] overflow-y-scroll disable-scrollbar">
      <div className="flex flex-col py-4">
        <div className="mb-4 text-2xl text-gray-300 font-semibold px-4">
          <Link to="/" className="flex justify-center items-center">
            <BsCameraFill className="text-3xl mr-1.5" />
            <h5>Share<span className="text-red-500">Pic</span></h5>
          </Link>
        </div>
        <Link to="/" className="flex items-center text-l text-gray-500 font-semibold px-4">
          <BsFillBookmarkFill className="mr-1" />
          Home
        </Link>
        <div className="flex flex-col">
          <h5 className="my-5 px-4">Discover categories</h5>
          <div className="flex flex-col gap-3">
            {categories.length !== 0 && 
              categories.map(cat => {
                const { _id, slug, imageUrl, title } = cat;
                return (
                  <Link 
                    to={`/category/${slug.current}`}
                    state={{ id: _id }}
                    key={_id}
                    className={`${styles['app__sidebar-link']} pl-4 text-l text-gray-400 font-semibold flex items-center transition duration-300 hover:text-gray-900`}
                  >
                    <img src={imageUrl} alt={title} className="w-10 h-10 mr-3.5 rounded-full" />
                    {title}
                  </Link>
                )
              })
            }
          </div>
        </div>
        <Link to={`/user-profile/${googleId}`} className="flex justify-center">
          <div className="shadow-md hover:shadow-sm duration-300 flex items-center p-2 rounded-lg mt-5">
            <img src={imageUrl} alt={name} className="w-11 h-11 rounded-full" />
            <h4 className="mx-3">{name}</h4>
            <BsCaretRight />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SideBar;