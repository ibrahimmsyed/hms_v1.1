import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// lodash
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';


// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  users: [],
  currentUser: {}
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },
    setCurrentUser(state, action) {
        state.isLoading = false;
        state.currentUser = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
    getUsersSuccess,
    setCurrentUser
} = slice.actions;

// ----------------------------------------------------------------------

export function getUsersDetails() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get('http://localhost:8000/users/', headers);
      const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getUsersSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCurrentUser() {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
          const accessToken = window.localStorage.getItem('accessToken');
          const headers = {
              headers: {
              Authorization: `JWT ${accessToken}`
              }
          }
        const response = await axios.get('http://localhost:8000/users/me/', headers);
        dispatch(slice.actions.setCurrentUser(response));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }


