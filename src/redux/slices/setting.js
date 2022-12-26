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
};

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
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
    setInventory,
    setCurrentInventory,
    updateInventory,
    removeInventory
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
      const response = await axios.get('http://localhost:8000/inventorydetails/', headers);
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
      const response = await axios.get(`http://localhost:8000/inventorydetails/${id}/`, headers);
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
      const response = await axios.post('http://localhost:8000/inventorydetails/', item, headers);
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
      const response = await axios.put(`http://localhost:8000/inventorydetails/${id}/`, data, headers);
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
      const response = await axios.delete(`http://localhost:8000/inventorydetails/${id}/`, headers);
      dispatch(slice.actions.removeInventory(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


