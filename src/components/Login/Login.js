import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { client } from '../../utils/client';
import { fetchUserQuery } from '../../utils/query';
import { BsCameraFill } from 'react-icons/bs';
import { useDispatchContext } from '../../context';
import GoogleLogin from 'react-google-login';
import styles from './Login.module.css';

const Login = () => {

  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const { getInitialData } = useDispatchContext();

  useEffect(() => {
    if(localStorage.getItem('profileObj')) navigate('/');
  }, [])

  const onSuccess = async res => {
    const { profileObj } = res;
    const { name, imageUrl, googleId } = profileObj;
    
    const doc = {
      _type: 'user',
      full_name: name,
      image: imageUrl,
      googleID: googleId
    }
    
    client.fetch(fetchUserQuery(googleId))
      .then(user => {
        if(!user.length) {
          client.create(doc).then((res) => {
            localStorage.setItem('profileObj', JSON.stringify({ ...profileObj, sanityID: res._id }));
            getInitialData();
          });
        }
        localStorage.setItem('profileObj', JSON.stringify({ ...profileObj, sanityID: user[0]._id }));
        getInitialData();
      })
      .catch(err => console.log(err.message));

      navigate('/');
  }

  const onFailure = res => {
    setLoginError(true);
    setLoginMessage("An error occurred");
  }

  return (
    <div className={`${styles.app__login} h-screen flex justify-center items-center`}>
      <div className={`${styles['app__login-wrapper']}`}>
        <video autoPlay muted loop className={`${styles['app__login-video']}`}>
          <source src="./video/video_bg.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="z-10 absolute">
        <h5 className={`${styles['app__login-logo']} text-2xl text-gray-300 font-semibold`}>
          Share<span className="text-red-500">Pic</span>
          <BsCameraFill className="text-3xl ml-1.5" />
        </h5>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          buttonText="Sign In with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          className="rounded-lg"
        />
        {loginError && <p className="text-red-500 text-center">{loginMessage}</p>}
      </div>
    </div>
  )
}

export default Login