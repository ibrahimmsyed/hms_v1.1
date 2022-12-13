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
  patientHistory: [],
  treatmentPlan: [],
  prescriptions: []
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
    setTreatmentPlan(state, action) {
      state.isLoading = false;
      state.treatmentPlan = action.payload;
    },
    updateTreatmentPlan(state, action) {
      state.isLoading = false;
      state.treatmentPlan = [...state.treatmentPlan, action.payload]
    },
    removeTreatmentPlan(state, action) {
      state.isLoading = false;
      state.treatmentPlan = state.treatmentPlan.filter(plan => plan.id !== action.payload)
    },
    setPrescription(state, action) {
      state.isLoading = false;
      state.prescriptions = action.payload;
    },
    updatePrescription(state, action) {
      state.isLoading = false;
      state.prescriptions = [...state.prescriptions, action.payload]
    },
    removePrescription(state, action) {
      state.isLoading = false;
      state.prescriptions = state.prescriptions.filter(plan => plan.id !== action.payload)
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
    removePatientDetail,
    setTreatmentPlan,
    updateTreatmentPlan,
    removeTreatmentPlan,
    setPrescription,
    updatePrescription,
    removePrescription
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
// Medical History
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
// Treatment plan
export function getTreatmentPlan() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get('http://localhost:8000/auth/procedure/', headers);
      dispatch(slice.actions.setTreatmentPlan(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addTreatmentPlan(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post('http://localhost:8000/auth/procedure/', plan, headers);
      dispatch(slice.actions.updateTreatmentPlan(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteTreatmentPlan(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`http://localhost:8000/auth/procedure/${id}/`, headers);
      dispatch(slice.actions.removeTreatmentPlan(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// Presciption
export function getPresciptions() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get('http://localhost:8000/auth/precription/', headers);
      dispatch(slice.actions.setPrescription(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addPresciption(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post('http://localhost:8000/auth/precription/', plan, headers);
      dispatch(slice.actions.updatePrescription(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deletePresciption(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`http://localhost:8000/auth/precription/${id}/`, headers);
      dispatch(slice.actions.removePrescription(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** ******************************************************** */
export function uploadFiles(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Type':'multipart/form-data'
            }
        }
      const response = await axios.post('http://localhost:8000/auth/imageUpload/', plan, headers);
      dispatch(slice.actions.updatePrescription(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
