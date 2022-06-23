import { createContext, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
// lodash
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';
// utils
import axios from '../utils/axios';
import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: [],
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isInitialized: true,
      user,
    };
  },
  USERDETAILS: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      user,
    };
  },
  PRACTICEDETAILS: (state, action) => {
    const { practicedetails } = action.payload;

    return {
      ...state,
      practicedetails,
    };
  }
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const UsersContext = createContext({
  ...initialState,
  userDetails: () => Promise.resolve(),
  setUserDetails: () => Promise.resolve(),
  practiceDetails: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

UsersProvider.propTypes = {
  children: PropTypes.node,
};

function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


  const userDetails = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const userresponse = await axios.get('http://localhost:8000/auth/users/', {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    })
    const user = userresponse.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
    dispatch({
      type: 'USERDETAILS',
      payload: {
        user,
      },
    });
  };

  const practiceDetails = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const pdetails = await axios.get('http://localhost:8000/auth/practicedetails/2/', {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    })
    const practicedetails = pdetails.data
    dispatch({
      type: 'PRACTICEDETAILS',
      payload: {
        practicedetails,
      },
    });
  };

  const setUserDetails = async (updatedUser) => {
    state.user.push(updatedUser)
    console.log('setUserDetails')
  };

  return (
    <UsersContext.Provider
      value={{
        ...state,
        userDetails,
        setUserDetails,
        practiceDetails
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
