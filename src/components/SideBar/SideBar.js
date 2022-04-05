import { useEffect, useState } from 'react';
import { BsCameraFill, BsArrowBarRight } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import styles from './SideBar.module.css';
import { Link, useParams } from 'react-router-dom';
import { useStateContext } from '../../context';
import { Loader } from '../index';

const SideBar = ({ sidebar }) => {
  const { categories, userGoogle } = useStateContext();
  const { name, imageUrl, googleId } = userGoogle;
  const [active, setActive] = useState(null);

  const params = useParams();

  useEffect(() => {
    if(!params?.slug) setActive(null);
  }, [params]);

  return (
      <div className={`h-screen fixed bg-white z-10 w-[220px] md:w-[250px] shadow-md overflow-y-scroll disable-scrollbar duration-500 ease-in-out ${sidebar ? 'translate-x-[-100%]' : ''}`}>
        <div className="flex flex-col py-4">     
          <div className="mb-4 text-2xl text-gray-300 font-semibold px-4">
            <Link to="/" className="flex justify-center items-center">
              <BsCameraFill className="text-5xl mr-1.5" />
              <h5>Share<span className="text-red-500">Pic</span></h5>
            </Link>
          </div>
          <Link to="/" className="flex items-center justify-center text-xl text-gray-500 font-semibold px-2 opacity-100 hover:opacity-60 duration-300">
            <FaHome className="mr-1 text-red-500 text-2xl" />
            Home
          </Link>
          <div className="flex flex-col">
            <h5 className="mt-5 py-2 font-semibold text-lg text-center border-b border-t bg-gray-50">Discover categories</h5>
            <div className="flex flex-col">
              {categories.length !== 0 ? 
                categories.map(cat => {
                  const { _id, slug, imageUrl, title } = cat;
                  return (
                    <Link 
                      to={`/category/${slug.current}`}
                      state={{ id: _id }}
                      key={_id}
                      onClick={() => setActive(slug.current)}
                      className={`${styles['app__sidebar-link']} ${active === slug.current ? styles['app__sidebar-link--active'] : ''} p-2 pl-4 text-l text-gray-400 font-semibold flex items-center transition duration-300 hover:text-gray-900 bg-white hover:bg-slate-100`}
                    >
                      <img src={imageUrl} alt={title} className="w-10 h-10 mr-3.5 rounded-full" />
                      {title}
                    </Link>
                  )
                }) 
                : <Loader />
              }
            </div>
          </div>
          <Link to={`/user-profile/${googleId}`} className="flex justify-center">
            <div className="shadow-md hover:shadow-sm duration-300 flex justify-between items-center p-2 pl-4 mt-3 w-full border-t border-b bg-gray-50">
              <img src={imageUrl} alt={name} className="w-11 h-11 rounded-full" />
              <h4 className="mx-3 font-semibold">{name}</h4>
              <BsArrowBarRight className="text-red-500 text-3xl" />
            </div>
          </Link>
        </div>
      </div>
  )
}

export default SideBar;