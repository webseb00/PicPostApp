import { useEffect, useState } from 'react'
import { BsCloudUpload, BsTrash } from 'react-icons/bs'
import { RiLoader4Fill } from 'react-icons/ri'
import { client } from '../../utils/client';
import { fetchCategoriesQuery, fetchUserQuery } from '../../utils/query';
import { ThreeDots } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const CreatePic = () => {

  const [profile, setProfileObj] = useState({});
  const [categories, setCategories] = useState([]);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImageType, setWrongImageType] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);

  const [picDetails, setPicDetails] = useState({
    title: '',
    description: '',
    category: '',
    link: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    client.fetch(fetchCategoriesQuery())
      .then(res => setCategories(res))
      .catch(err => console.log(err));

    const { googleId } = JSON.parse(localStorage.getItem('profileObj'));
    client.fetch(fetchUserQuery(googleId))
      .then(id => setProfileObj(id))
      .catch(err => console.log(err));
  }, []);


  const removeImageAsset = e => {
    e.stopPropagation();
    setImageAsset(null);
  }

  const handlePicDetails = e => setPicDetails({ ...picDetails, [e.target.name]: e.target.value });

  const handleImageUpload = e => {
    const imageFile = e.target.files[0];
    if(!imageFile) return false;

    if(imageFile.type === 'image/jpeg' || imageFile.type === 'image/jpg' || imageFile.type === 'image/png' || imageFile.type === 'image/gif' || imageFile.type === 'image/tiff' || imageFile.type === 'image/svg') {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload('image', imageFile, { contentType: imageFile.type, filename: imageFile.name })
        .then(res => { 
          setImageAsset(res);
          setLoading(false);
        })
        .catch(err => `Upload image failed ${err.message}`);

    } else {
      setWrongImageType(true);
      setLoading(false);
    }
  }

  const savePicPost = () => {
    const { title, description, category, link } = picDetails;

    if(title && description && category && link) {
      setEmptyFields(false);
      setSending(true);

      const doc = {
        _type: 'pinpost',
        title: title,
        description: description,
        link: link,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        },
        author: {
          _type: 'reference',
          _ref: profile[0]._id
        },
        categories: {
          _type: 'reference',
          _ref: category
        }
      }
  
      client.create(doc)
        .then(() => {
          setSending(false);
          navigate('/');
        })
        .catch(err => {
          setSending(false);
          setPicDetails({ title: '', description: '', category: '', link: '' });
          console.log(`Upload Pic post failed: ${err.message}`);
        });
    } else {
      setEmptyFields(true);
    }
  }

  return (
    <div className="h-screen flex items-center justify-center overflow-y-scroll disable-scrollbar"> 
    <div className="w-4/5 sm:w-3/5 md:w-4/5">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-md p-4 my-7 items-center">
        <div className="basis-4/5 md:basis-2/5 bg-slate-200 cursor-pointer p-3 h-full">
          <div className="h-96">
            <label htmlFor={`${imageAsset?._id ? '' : 'myPic'}`} className="relative flex flex-col h-full border-2 border-dotted border-slate-400 p-3 block">
              {imageAsset && 
              <div className="flex justify-center h-full w-full relative">
                <img className="object-contain" src={imageAsset.url} alt={imageAsset.originalFileName} />
                <div
                  onClick={removeImageAsset} 
                  className="border shadow-md bg-slate-50 p-2 rounded-full flex items-center justify-center absolute right-2 bottom-0 cursor-pointer">
                  <BsTrash className="text-red-500 text-xl" />
                </div>
              </div>
              }
              {!imageAsset &&
              <div className="flex flex-col justify-around h-full">
                <div className="flex flex-col items-center">
                  {wrongImageType && <p className="text-red-600 font-semibold">File type is invalid!</p>}
                  {loading && <ThreeDots height="60" width="60" color="#0ea5e9" ariaLabel="loading" />}
                  {!loading && 
                    <>
                      <BsCloudUpload className="text-3xl" />
                      <p>Click to Upload</p>
                    </>}
                </div>
                <p className="text-center">
                  <b>Recommendation:</b> Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
                </p>
              </div>
              }
              <input 
                type="file" 
                name="image" 
                id="myPic" 
                className="w-0 h-0 absolute" 
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>
        <div className="w-full md:basis-4/5 flex flex-col justify-center gap-7 p-3">
        {emptyFields && <p className="text-center text-red-500 font-semibold">Please fill required fields!</p>}
          <div>
            <input 
              type="text" 
              name="title" 
              className="outline-none border-solid border-gray-300 border-b-2 bg-transparent p-3 text-2xl w-full" 
              placeholder="Add Your Title"
              onChange={handlePicDetails} 
            />
          </div>
          <div>
            <input 
              type="text" 
              name="description" 
              className="outline-none border-solid border-gray-300 border-b-2 bg-transparent p-1 text-xl w-full" 
              placeholder="Add description about your pic..."
              onChange={handlePicDetails} 
            />
          </div>
          <div>
            <input 
              type="text" 
              name="link" 
              className="outline-none border-solid border-gray-300 border-b-2 bg-transparent p-1 text-xl w-full" 
              placeholder="Add Link"
              onChange={handlePicDetails} 
            />
          </div>
          <div>
            <h3 className="text-center mb-1 font-semibold">Choose Pic Category</h3>
            <select
              className="w-full p-2 outline-none border-solid border-gray-300 border-b-2"
              name="category"
              onChange={handlePicDetails}
            >
              <option value="">--- Select Categories ---</option>
              {categories && categories.map(el => (
                <option key={el._id} value={el._id}>{el.title}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button 
              type="button"
              onClick={savePicPost} 
              disabled={sending}
              className="rounded-lg shadow-md outline-none border-2 border-solid border-sky-600 bg-sky-600 duration-300 cursor-pointer text-white py-2 px-6 text-md hover:bg-transparent hover:text-sky-600 font-semibold flex items-center">
                {sending ? 
                <>
                  <RiLoader4Fill className="animate-spin mr-2 text-2xl" />
                  Sending...
                </>
                :
                <p>Add pic</p>}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CreatePic;