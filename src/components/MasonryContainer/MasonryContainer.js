import Masonry from 'react-masonry-css'
import { PicPost } from '../index'
import { BsEmojiFrown } from 'react-icons/bs'

const breakpointColumnsObj = {
  default: 5,
  1200: 4,
  900: 3,
  700: 2,
  500: 1,
};

const MasonryContainer = ({ items }) => {

  if(!items?.length) return <h4 className="text-center text-2xl flex flex-col items-center mt-8">
                            No pics found in this category..
                            <BsEmojiFrown className="mt-2" />
                           </h4>

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid flex gap-5"
    >
      {items.map((item, index) => <PicPost key={index} item={item} />)}
    </Masonry>
  )
}

export default MasonryContainer;