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
  patients: [],
  practicedetails: [],
  inventorydetails: []
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

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
  PATIENTSDETAILS: (state, action) => {
    const { patients } = action.payload;

    return {
      ...state,
      patients,
    };
  },
  PRACTICEDETAILS: (state, action) => {
    const { practicedetails } = action.payload;

    return {
      ...state,
      practicedetails,
    };
  },
  INVENTORYDETAILS: (state, action) => {
    const { inventorydetails } = action.payload;

    return {
      ...state,
      inventorydetails,
    };
  },
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const UsersContext = createContext({
  ...initialState,
  userDetails: () => Promise.resolve(),
  patientsDetails: () => Promise.resolve(),
  setUserDetails: () => Promise.resolve(),
  practiceDetails: () => Promise.resolve(),
  inventoryDetails: () => Promise.resolve(),
  setInventoryDetails: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

UsersProvider.propTypes = {
  children: PropTypes.node,
};

function UsersProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


  const userDetails = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const userresponse = await axios.get(`${API_ENDPOINT}/users/`, {
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

  const patientsDetails = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const patientsresponse = await axios.get(`${API_ENDPOINT}/patientdetails/`, {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    })
    const patients = patientsresponse.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
    dispatch({
      type: 'PATIENTSDETAILS',
      payload: {
        patients,
      },
    });
  };

  const practiceDetails = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const pdetails = await axios.get(`${API_ENDPOINT}/practicedetails/2/`, {
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
    const index = state.user.findIndex(item => item.id === updatedUser.id)
    if(index > -1){ state.user[index] = updatedUser }else{ state.user.push(updatedUser) }
    console.log('setUserDetails')
  };

  const inventoryDetails = async () => {
    const accessToken = window.localStorage.getItem('accessToken');
    const idetails = await axios.get(`${API_ENDPOINT}/inventorydetails/`, {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    })
    const inventorydetails = idetails.data
    dispatch({
      type: 'INVENTORYDETAILS',
      payload: {
        inventorydetails,
      },
    });
  };

  const setInventoryDetails = async (updatedInventory) => {
    const index = state.inventorydetails.findIndex(item => item.id === updatedInventory.id)
    if(index > -1){ state.inventorydetails[index] = updatedInventory }else{ state.inventorydetails.push(updatedInventory) }
    console.log('setInventoryDetails')
  };

  return (
    <UsersContext.Provider
      value={{
        ...state,
        userDetails,
        patientsDetails,
        setUserDetails,
        practiceDetails,
        inventoryDetails,
        setInventoryDetails,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export { UsersContext, UsersProvider };
