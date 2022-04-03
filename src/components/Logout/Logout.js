import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogout } from 'react-google-login';
import { AiOutlineLogout } from 'react-icons/ai';
import styles from './Logout.module.css';

const Logout = () => {
  
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if(!mounted) setMounted(true);
  }, []);

  const onSuccess = () => {
    localStorage.removeItem('profileObj');
    navigate('/login');
  };
  const onFailure = () => console.log('logout failed');

  const { signOut } = useGoogleLogout({
    clientId: process.env.GOOGLE_CLIENT_ID,
    onLogoutSuccess: onSuccess,
    onFailure: onFailure,
  });

  return (
      (mounted && 
        <button 
          className={`${styles['app__logout-btn']} shadow-md`}
          onClick={signOut} 
        >
          <AiOutlineLogout className={`${styles['app__logout-icon']} text-red-500`} />
        </button>
      )
  )
}

export default Logout;