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
  labs: [],
  currentLab: {},
  labworks: []
};

const slice = createSlice({
  name: 'labs',
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

    // GET LAB DETAILS
    getLabDetailsSuccess(state, action) {
      state.isLoading = false;
      state.labs = action.payload;
    },
    setLabDetails(state, action) {
      state.isLoading = false;
      state.currentLab = action.payload
    },
    updateLabDetails(state, action) {
      state.isLoading = false;
      state.currentLab = [...state.currentLab, action.payload]
    },
    removeLabDetails(state, action) {
      state.isLoading = false;
      state.labs = state.labs.filter(lab => lab.id !== action.payload)
    },
    // GET LAB WORK
    getLabWorkSuccess(state, action) {
      state.isLoading = false;
      state.labworks = action.payload;
    },
    setLabWork(state, action) {
      state.isLoading = false;
      state.labworks = [...state.labworks, action.payload]
    },
    updateLabWork(state, action) {
      state.isLoading = false;
      state.labworks = [...state.labworks, action.payload]
    },
    removeLabWork(state, action) {
      state.isLoading = false;
      state.labworks = state.labworks.filter(lab => lab.id !== action.payload)
    }
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
    getLabDetailsSuccess,
    setLabDetails,
    updateLabDetails,
    removeLabDetails,
    getLabWorkSuccess,
    setLabWork,
    updateLabWork,
    removeLabWork
} = slice.actions;

// ----------------------------------------------------------------------

export function getLabDetails() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get('http://localhost:8000/auth/labdetails/', headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getLabWorkSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCurrentLabDetail(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get(`http://localhost:8000/auth/labdetails/${id}/`, headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.setLabDetails(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addLabDetail(data) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
          const accessToken = window.localStorage.getItem('accessToken');
          const headers = {
              headers: {
              Authorization: `JWT ${accessToken}`
              }
          }
        const response = await axios.post('http://localhost:8000/auth/labdetails/', data, headers);
        dispatch(slice.actions.updateLabDetails(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}
export function updateLabDetail(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`http://localhost:8000/auth/labdetails/${id}/`, data, headers);
      dispatch(slice.actions.setLabDetails(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteLabDetail(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`http://localhost:8000/auth/labdetails/${id}/`, data, headers);
      dispatch(slice.actions.removeLabDetails(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

export function getAllLabWork() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get('http://localhost:8000/auth/labcategory/', headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getLabWorkSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addLabWorks(data) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
          const accessToken = window.localStorage.getItem('accessToken');
          const headers = {
              headers: {
              Authorization: `JWT ${accessToken}`
              }
          }
        const response = await axios.post('http://localhost:8000/auth/labcategory/', data, headers);
        dispatch(slice.actions.updateLabWork(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}
export function updateLabWorks(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`http://localhost:8000/auth/labcategory/${id}/`, data, headers);
      dispatch(slice.actions.setLabWork(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteLabWorks(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`http://localhost:8000/auth/labcategory/${id}/`, data, headers);
      dispatch(slice.actions.removeLabWork(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


