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
  success: null,
  labs: [],
  currentLab: {},
  labworks: [],
  labNames: [],
  treatmentPlans: []
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

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
    // HAS ERROR
    resetSuccess(state, action) {
      state.success = action.payload;
    },

    // GET LAB DETAILS
    getLabDetailsSuccess(state, action) {
      state.isLoading = false;
      state.labs = action.payload;
    },
    setLabDetails(state, action) {
      state.isLoading = false;
      state.success = true;
      state.currentLab = action.payload
    },
    updateLabDetails(state, action) {
      state.isLoading = false;
      state.success = true;
      state.currentLab = [...state.currentLab, action.payload]
    },
    modifyLabDetails(state, action) {
      state.isLoading = false;
      state.success = true;
      state.currentLab = state?.currentLab?.map(obj => action.payload?.id === obj?.id && action.payload || obj) 
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
      state.success = true;
      state.labworks = [...state.labworks, action.payload]
    },
    updateLabWork(state, action) {
      state.isLoading = false;
      state.success = true;
      state.labworks = [...state.labworks, action.payload]
    },
    modifyLabWork(state, action) {
      state.isLoading = false;
      state.success = true;
      state.labworks = state?.labworks?.map(obj => action.payload?.id === obj?.id && action.payload || obj) 
    },
    removeLabWork(state, action) {
      state.isLoading = false;
      state.labworks = state.labworks.filter(lab => lab.id !== action.payload)
    },
    // LAB NAME
    getlabNameSuccess(state, action) {
      state.isLoading = false;
      state.labNames = action.payload;
    },
    setlabName(state, action) {
      state.isLoading = false;
      state.success = true;
      state.labNames = [...state.labNames, action.payload]
    },
    updatelabName(state, action) {
      state.isLoading = false;
      state.labNames = [...state.labNames, action.payload]
    },
    getTreatmentPlansSuccess(state, action) {
      state.isLoading = false;
      state.treatmentPlans = action.payload
    },
    updateTreatmentPlans(state, action) {
      state.isLoading = false;
      state.success = true;
      state.treatmentPlans = [...state.treatmentPlans, action.payload]
    },
    modifyTreatmentPlans(state, action) {
      state.isLoading = false;
      state.success = true;
      state.treatmentPlans = state?.treatmentPlans?.map(obj => action.payload?.id === obj?.id && action.payload || obj) 
    },
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
    removeLabWork,
    getlabNamesSuccess,
    setlabName,
    updatelabName,
    getTreatmentPlansSuccess,
    modifyTreatmentPlans
} = slice.actions;

// ----------------------------------------------------------------------

export function resetSuccessLabs() {
  return async () => {
    dispatch(slice.actions.resetSuccess(null));
  }
}

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
      const res = await axios.get(`${API_ENDPOINT}/labdetails/`, headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getLabDetailsSuccess(res.data));
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
      const res = await axios.get(`${API_ENDPOINT}/labdetails/${id}/`, headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.setLabDetails(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addLabDetail(data) {
    return async () => {
      dispatch(slice.actions.hasError(null));
      dispatch(slice.actions.startLoading());
      try {
          const accessToken = window.localStorage.getItem('accessToken');
          const headers = {
              headers: {
              Authorization: `JWT ${accessToken}`
              }
          }
        const response = await axios.post(`${API_ENDPOINT}/labdetails/`, data, headers);
        dispatch(slice.actions.updateLabDetails(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}
export function updateLabDetail(data, id) {
  return async () => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`${API_ENDPOINT}/labdetails/${id}/`, data, headers);
      dispatch(slice.actions.modifyLabDetails(response.data));
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
      const response = await axios.delete(`${API_ENDPOINT}/labdetails/${id}/`, headers);
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
      const res = await axios.get(`${API_ENDPOINT}/labcategory/`, headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getLabWorkSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addLabWorks(data) {
    return async () => {
      dispatch(slice.actions.hasError(null));
      dispatch(slice.actions.startLoading());
      try {
          const accessToken = window.localStorage.getItem('accessToken');
          const headers = {
              headers: {
              Authorization: `JWT ${accessToken}`
              }
          }
        const response = await axios.post(`${API_ENDPOINT}/labcategory/`, data, headers);
        dispatch(slice.actions.updateLabWork(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
}
export function updateLabWorks(data, id) {
  return async () => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`${API_ENDPOINT}/labcategory/${id}/`, data, headers);
      dispatch(slice.actions.modifyLabWork(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteLabWorks(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/labcategory/${id}/`, headers);
      dispatch(slice.actions.removeLabWork(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------
export function getAllTreatmentPlans() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get(`${API_ENDPOINT}/treatmentplans/`, headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getTreatmentPlansSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addTreatmentPlans(data) {
  return async () => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/treatmentplans/`, data, headers);
      dispatch(slice.actions.updateTreatmentPlans(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateTreatmentPlans(data, id) {
  return async () => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`${API_ENDPOINT}/treatmentplans/${id}/`, data, headers);
      dispatch(slice.actions.modifyTreatmentPlans(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getAllLabNames() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const res = await axios.get(`${API_ENDPOINT}/labname/`, headers);
      // const response = res.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
      dispatch(slice.actions.getlabNameSuccess(res.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addLabName(data) {
  return async () => {
    dispatch(slice.actions.hasError(null));
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/labname/`, data, headers);
      dispatch(slice.actions.updatelabName(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

