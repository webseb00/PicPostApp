import { useEffect, useContext, createContext, useReducer } from 'react';
import { client } from '../utils/client';
import { fetchCategoriesQuery } from '../utils/query';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const SET_USER_GOOGLE = 'SET_USER_GOOGLE';
const SET_CATEGORIES = 'SET_CATEGORIES';

const initialState = {
  userGoogle: [],
  categories: []
};

const reducer = (state, action) => {
  switch(action.type) {
    case SET_USER_GOOGLE:
      return { ...state, userGoogle: action.payload };
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function StateProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getInitialData();
  }, []);

  const setCategories = payload => dispatch({ type: SET_CATEGORIES, payload });
  const setUserGoogle = payload => dispatch({ type: SET_USER_GOOGLE, payload });

  const getGoogleUserData = () => {
    setUserGoogle(JSON.parse(localStorage.getItem('profileObj')));
  }

  const getCategories = () => {
    client.fetch(fetchCategoriesQuery())
      .then(res => setCategories(res))
      .catch(err => console.log(err.message));
  }

  const getInitialData = () => {
    if(localStorage.getItem('profileObj')) {
      getGoogleUserData();
      getCategories();
    }
  }

  return (
    <AppDispatchContext.Provider value={{ getGoogleUserData, getCategories, getInitialData }}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  )
}

export const useStateContext = () => useContext(AppStateContext);
export const useDispatchContext = () => useContext(AppDispatchContext);