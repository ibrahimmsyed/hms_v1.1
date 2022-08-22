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
  patients: [],
  currentPatient: {},
  patientHistory: []
};

const slice = createSlice({
  name: 'patient',
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
    getPatientsSuccess(state, action) {
      state.isLoading = false;
      state.patients = action.payload;
    },
    setPatientDetails(state, action) {
      state.isLoading = false;
      state.currentPatient = action.payload
    },
    updatePatientDetails(state, action) {
      state.isLoading = false;
      state.currentPatient = [...state.currentPatient, action.payload]
    },
    removePatientDetail(state, action) {
      state.isLoading = false;
      state.patients = state.patients.filter(patient => patient.id !== action.payload)
  },
    setPatientHistory(state, action) {
      state.isLoading = false;
      state.patientHistory = action.payload;
    },
    updatePatientHistory(state, action) {
      state.isLoading = false;
      state.patientHistory = [...state.patientHistory, action.payload]
    },
    deletePatientHistory(state, action) {
      state.isLoading = false;
      state.patientHistory = state.patientHistory.filter(history => history.id !== action.payload)
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
    getPatientsSuccess,
    setPatientHistory,
    setPatientDetails,
    updatePatientHistory,
    updatePatientDetails,
    deletePatientHistory,
    removePatientDetail
} = slice.actions;

// ----------------------------------------------------------------------

export function getPatientsDetails() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get('http://localhost:8000/auth/patientdetails/', headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getPatientsSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCurrentPatientsDetails(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get(`http://localhost:8000/auth/patientdetails/${id}/`, headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.setPatientDetails(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPatientsDetail(data) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
          const accessToken = window.localStorage.getItem('accessToken');
          const headers = {
              headers: {
              Authorization: `JWT ${accessToken}`
              }
          }
        const response = await axios.post('http://localhost:8000/auth/patientdetails/', data, headers);
        dispatch(slice.actions.updatePatientDetails(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}
export function updatePatientsDetail(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`http://localhost:8000/auth/patientdetails/${id}/`, data, headers);
      dispatch(slice.actions.setPatientDetails(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deletePatientsDetail(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`http://localhost:8000/auth/patientdetails/${id}/`, data, headers);
      dispatch(slice.actions.removePatientDetail(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getMedicalHistory() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get('http://localhost:8000/auth/medicalhistory/', headers);
      dispatch(slice.actions.setPatientHistory(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addMedicalHistory(history) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post('http://localhost:8000/auth/medicalhistory/', history, headers);
      dispatch(slice.actions.updatePatientHistory(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteMedicalHistory(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`http://localhost:8000/auth/medicalhistory/${id}/`, headers);
      dispatch(slice.actions.deletePatientHistory(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}


