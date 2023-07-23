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
  inventory: [],
  notes: [],
  practiceDetails: []
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const slice = createSlice({
  name: 'setting',
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

    setInventory(state, action) {
      state.isLoading = false;
      state.inventory = action.payload;
    },
    setCurrentInventory(state, action) {
      state.isLoading = false;
      state.currentInventory = action.payload;
    },
    updateInventory(state, action) {
      state.isLoading = false;
      state.inventory = [...state.inventory, action.payload]
    },
    removeInventory(state, action) {
      state.isLoading = false;
      state.inventory = state.inventory.filter(item => item.id !== action.payload)
    },
    setNotes(state, action) {
      state.isLoading = false;
      state.notes = action.payload;
    },
    updateNotes(state, action) {
      state.isLoading = false;
      state.notes = [...state.notes, action.payload]
    },
    removeNotes(state, action) {
      state.isLoading = false;
      state.notes = state.notes.filter(item => item.id !== action.payload)
    },
    setPracticeDetails(state, action) {
      state.isLoading = false;
      state.practiceDetails = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
    setInventory,
    setCurrentInventory,
    updateInventory,
    removeInventory,
    setNotes,
    updateNotes,
    removeNotes
} = slice.actions;

// ----------------------------------------------------------------------
// Inventory
export function getAllInventory() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/inventorydetails/`, headers);
      dispatch(slice.actions.setInventory(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getInventory(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/inventorydetails/${id}/`, headers);
      dispatch(slice.actions.setCurrentInventory(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addInventory(item) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/inventorydetails/`, item, headers);
      dispatch(slice.actions.updateInventory(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function modifyInventory(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`${API_ENDPOINT}/inventorydetails/${id}/`, data, headers);
      dispatch(slice.actions.setCurrentInventory(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteInventory(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/inventorydetails/${id}/`, headers);
      dispatch(slice.actions.removeInventory(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** NOTES ******************************************************** */

export function getNotes() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/notes/`, headers);
      dispatch(slice.actions.setNotes(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addNotes(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/notes/`, plan, headers);
      dispatch(slice.actions.updateNotes(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteNotes(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/notes/${id}/`, headers);
      dispatch(slice.actions.removeNotes(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** Practice Details ******************************************************** */

export function getPracticeDetails() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/practicedetails/`, headers);
      dispatch(slice.actions.setPracticeDetails(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addPracticeDetails(data) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const formData = new FormData();
          Object.keys(data).forEach(key => { 
              formData.append(key, data[key]);
          })
        const headers = {
          headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-type':'multipart/form-data',
            'Content-Disposition': `attachment; filename=${data?.logo?.name}`,
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/practicedetails/`, formData, headers);
      dispatch(slice.actions.updatePracticeDetails(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updatePracticeDetails(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const formData = new FormData();
            Object.keys(data).forEach(key => { 
                formData.append(key, data[key]);
            })
        const headers = {
          headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-type':'multipart/form-data',
            'Content-Disposition': `attachment; filename=${data?.logo?.name}`,
            }
        }
      const response = await axios.put(`${API_ENDPOINT}/practicedetails/${id}/`, formData, headers);
      dispatch(slice.actions.setPracticeDetails([...response.data]));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
