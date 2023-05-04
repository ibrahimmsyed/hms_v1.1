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

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

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
    setUsers(state, action) {
      state.isLoading = false;
      state.users = action.payload
    },
    updateUsers(state, action) {
      state.isLoading = false;
      state.users = [...state.users, action.payload]
    },
    removeUsers(state, action) {
      state.isLoading = false;
      state.users = state.users.filter(user => user.id !== action.payload)
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
      const res = await axios.get(`${API_ENDPOINT}/users/`, headers);
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
        const response = await axios.get(`${API_ENDPOINT}/users/me`, headers);
        dispatch(slice.actions.setCurrentUser(response));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }

/** PRACTICE STAFF ******************************************************** */

export function getUsers() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/practicestaff/`, headers);
      dispatch(slice.actions.setUsers(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addUser(user) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const userDetails = {
          username: user.username,
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.email,
          registration_number: user.registrationNumber,
          calendar_color: user.calendarColor,
          display_picture: user.displayPicture,
          phone_number: user.phoneNumber,
          is_staff: user.isStaff,
          is_active: user.isActive,
          is_superuser: user.isSuperuser,
          is_front_office: user.isFrontOffice,
          is_back_office: user.isBackOffice,
          password: user.newPassword,
          re_password: user.confirmNewPassword
      }
      const formData = new FormData();
      Object.keys(userDetails).forEach(key => { 
          formData.append(key, userDetails[key]);
      })
      const headers = {
          headers: {
          Authorization: `JWT ${accessToken}`,
          'Content-type':'multipart/form-data',
          'Content-Disposition': `attachment; filename=${user?.displayPicture?.name}`,
          }
      }
      const response = await axios.post(`${API_ENDPOINT}/practicestaff/`, formData, headers);
      dispatch(slice.actions.updateUsers(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteUser(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/deleteuser/${id}/`, headers);
      dispatch(slice.actions.removeUsers(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateUser(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        let headers = {}
        const userDetails = {
          username: data.username,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          registration_number: data.registrationNumber,
          calendar_color: data.calendarColor,
          display_picture: data.displayPicture,
          phone_number: data.phoneNumber,
          is_staff: data.isStaff,
          is_active: data.isActive,
          is_superuser: data.isSuperuser,
          is_front_office: data.isFrontOffice,
          is_back_office: data.isBackOffice,
        }
        const formData = new FormData();
        Object.keys(userDetails).forEach(key => { 
            if(userDetails[key])
            formData.append(key, userDetails[key]);
        })
        if(data.displayPicture){
          headers = {
            headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-type':'multipart/form-data',
            'Content-Disposition': `attachment; filename=${data?.displayPicture?.name}`,
              }
            }
        }else{
          headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
          }
        }
      const response = await axios.put(`${API_ENDPOINT}/updateuser/${id}/`, formData, headers);
      dispatch(slice.actions.setCurrentInventory(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
