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
  calendarEvents: [],
  patientHistory: [],
  procedure: [],
  prescriptions: [],
  medicalCertificate: [],
  clinicalNotes: [],
  treatmentPlans: [],
  invoice: []
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

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
    setProcedure(state, action) {
      state.isLoading = false;
      state.procedure = action.payload;
    },
    updateProcedure(state, action) {
      state.isLoading = false;
      state.procedure = [...state.procedure, action.payload]
    },
    removeProcedure(state, action) {
      state.isLoading = false;
      state.procedure = state.procedure.filter(plan => plan.id !== action.payload)
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
    setFiles(state, action) {
      state.isLoading = false;
      state.files = action.payload;
    },
    updateFiles(state, action) {
      state.isLoading = false;
      state.files = [...state.files, action.payload]
    },
    removeFiles(state, action) {
      state.isLoading = false;
      state.files = state.files.filter(plan => plan.id !== action.payload)
    },
    setMedicalCertificate(state, action) {
      state.isLoading = false;
      state.medicalCertificate = action.payload;
    },
    updateMedicalCertificate(state, action) {
      state.isLoading = false;
      state.medicalCertificate = [...state.medicalCertificate, action.payload]
    },
    removeMedicalCertificate(state, action) {
      state.isLoading = false;
      state.medicalCertificate = state.medicalCertificate.filter(plan => plan.id !== action.payload)
    },
    setClinicalNotes(state, action) {
      state.isLoading = false;
      state.clinicalNotes = action.payload;
    },
    updateClinicalNotes(state, action) {
      state.isLoading = false;
      state.clinicalNotes = [...state.clinicalNotes, action.payload]
    },
    removeClinicalNotes(state, action) {
      state.isLoading = false;
      state.clinicalNotes = state.clinicalNotes.filter(plan => plan.id !== action.payload)
    },
    setCalendarEvent(state, action) {
      state.isLoading = false;
      state.calendarEvents = action.payload;
    },
    updateCalendarEvents(state, action) {
      state.isLoading = false;
      state.calendarEvents = [...state.calendarEvents, action.payload]
    },
    removeCalendarEvents(state, action) {
      state.isLoading = false;
      state.calendarEvents = state.calendarEvents.filter(plan => plan.id !== action.payload)
    },
    getTreatmentPlansSuccess(state, action) {
      state.isLoading = false;
      state.treatmentPlans = action.payload
    },
    updateTreatmentPlans(state, action) {
      state.isLoading = false;
      state.treatmentPlans = [...state.treatmentPlans, action.payload]
    },
    setInvoice(state, action) {
      state.isLoading = false;
      state.invoice = action.payload;
    },
    updateInvoice(state, action) {
      state.isLoading = false;
      state.invoice = [...state.invoice, action.payload]
    },
    removeInvoice(state, action) {
      state.isLoading = false;
      state.invoice = state.invoice.filter(plan => plan.id !== action.payload)
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
    setCalendarEvents,
    updatePatientHistory,
    updatePatientDetails,
    deletePatientHistory,
    removePatientDetail,
    setProcedure,
    updateProcedure,
    removeProcedure,
    setPrescription,
    updatePrescription,
    removePrescription,
    setFiles,
    updateFiles
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
      const res = await axios.get(`${API_ENDPOINT}/patientdetails/`, headers);
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
      const res = await axios.get(`${API_ENDPOINT}/patientdetails/${id}/`, headers);
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
          const formData = new FormData();
            Object.keys(data).forEach(key => { 
                formData.append(key, data[key]);
            })
          const headers = {
            headers: {
              Authorization: `JWT ${accessToken}`,
              'Content-type':'multipart/form-data',
              'Content-Disposition': `attachment; filename=${data?.dop?.name}`,
              }
          }
        const response = await axios.post(`${API_ENDPOINT}/patientdetails/`, formData, headers);
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
        const formData = new FormData();
            Object.keys(data).forEach(key => { 
                formData.append(key, data[key]);
            })
        const headers = {
          headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-type':'multipart/form-data',
            'Content-Disposition': `attachment; filename=${data?.dop?.name}`,
            }
        }
      const response = await axios.put(`${API_ENDPOINT}/patientdetails/${id}/`, formData, headers);
      dispatch(slice.actions.setPatientDetails(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deletePatientsDetail( id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/patientdetails/${id}/`, headers);
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
      const response = await axios.get(`${API_ENDPOINT}/medicalhistory/`, headers);
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
      const response = await axios.post(`${API_ENDPOINT}/medicalhistory/`, history, headers);
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
      const response = await axios.delete(`${API_ENDPOINT}/medicalhistory/${id}/`, headers);
      dispatch(slice.actions.deletePatientHistory(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// Procedure
export function getProcedure() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/procedure/`, headers);
      dispatch(slice.actions.setProcedure(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addProcedure(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/procedure/`, plan, headers);
      dispatch(slice.actions.updateProcedure(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteProcedure(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/procedure/${id}/`, headers);
      dispatch(slice.actions.removeProcedure(id));
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
      const response = await axios.get(`${API_ENDPOINT}/precription/`, headers);
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
      const response = await axios.post(`${API_ENDPOINT}/precription/`, plan, headers);
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
      const response = await axios.delete(`${API_ENDPOINT}/precription/${id}/`, headers);
      dispatch(slice.actions.removePrescription(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** ******************************************************** */
export function getUploadFiles() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/fileUpload/`, headers);
      dispatch(slice.actions.setFiles(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function uploadFiles(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const formData = new FormData();
        formData.append("File_to_upload", plan.File_to_upload);
        formData.append("patientId", plan.patientId);
        formData.append("tags", plan.tag);
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`,
            'Content-Disposition': `attachment; filename=${plan?.File_to_upload?.name}`,
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/fileUpload/`, formData, headers);
      dispatch(slice.actions.updateFiles(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** ******************************************************** */

export function getMedicalCertificate() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/medicalcertificate/`, headers);
      dispatch(slice.actions.setMedicalCertificate(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addMedicalCertificate(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/medicalcertificate/`, plan, headers);
      dispatch(slice.actions.updateMedicalCertificate(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteMedicalCertificate(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/medicalcertificate/${id}/`, headers);
      dispatch(slice.actions.removeMedicalCertificate(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** ******************************************************** */

export function getClinicalNotes() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/clinicalnotes/`, headers);
      dispatch(slice.actions.setClinicalNotes(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addClinicalNotes(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/clinicalnotes/`, plan, headers);
      dispatch(slice.actions.updateClinicalNotes(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteClinicalNotes(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/clinicalnotes/${id}/`, headers);
      dispatch(slice.actions.removeClinicalNotes(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** *****************Invoice************************** */

export function getInvoice() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/invoice/`, headers);
      dispatch(slice.actions.setInvoice(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addInvoice(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/invoice/`, plan, headers);
      dispatch(slice.actions.updateInvoice(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteInvoice(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/invoice/${id}/`, headers);
      dispatch(slice.actions.removeInvoice(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/** *****************Calendar Events***************************** */

export function getCalendarEvents() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.get(`${API_ENDPOINT}/eventcalendar/`, headers);
      dispatch(slice.actions.setCalendarEvent(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function addCalendarEvents(plan) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.post(`${API_ENDPOINT}/eventcalendar/`, plan, headers);
      dispatch(slice.actions.updateCalendarEvents(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateCalendarEvents(data, id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.put(`${API_ENDPOINT}/eventcalendar/${id}/`, data, headers);
      dispatch(slice.actions.updateCalendarEvents(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteCalendarEvents(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const response = await axios.delete(`${API_ENDPOINT}/eventcalendar/${id}/`, headers);
      dispatch(slice.actions.removeCalendarEvents(id));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ------------------Treatment Plans------------------------------------
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

/** *****************Get All Patients Details************************** */

export function getPatientDetails(id) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
        const accessToken = window.localStorage.getItem('accessToken');
        const headers = {
            headers: {
            Authorization: `JWT ${accessToken}`
            }
        }
      const url = id ? `${API_ENDPOINT}/patient/${id}/` : `${API_ENDPOINT}/patient/`;
      const response = await axios.get(url, headers);
      let calendar = []
      let plans = []
      let notes = []
      let prescription = []
      let uploads = [];
      let invoice = [];
      if(id){
        const patient = response.data
        dispatch(slice.actions.setClinicalNotes(patient.notes));
        dispatch(slice.actions.setFiles(patient.uploads));
        dispatch(slice.actions.setPrescription(patient.prescription));
        dispatch(slice.actions.getTreatmentPlansSuccess(patient.plans)); 
        dispatch(slice.actions.setCalendarEvent(patient.calendar));
        dispatch(slice.actions.getPatientsSuccess([patient]));
        dispatch(slice.actions.setInvoice(patient.invoice));
      }else{
        response.data.forEach(data => {
          if(data.calendar.length){ calendar = [...data.calendar, ...calendar] }
          if(data.plans.length){ plans = [...data.plans, ...plans] }
          if(data.notes.length){ notes = [...data.notes, ...notes] }
          if(data.prescription.length){ prescription = [...data.prescription, ...prescription] }
          if(data.uploads.length){ uploads = [...data.uploads, ...uploads] }
          if(data.invoice.length){ invoice = [...data.invoice, ...invoice] }
        })
        dispatch(slice.actions.setClinicalNotes(notes));
        dispatch(slice.actions.setFiles(uploads));
        dispatch(slice.actions.setPrescription(prescription));
        dispatch(slice.actions.getTreatmentPlansSuccess(plans)); 
        dispatch(slice.actions.setCalendarEvent(calendar));
        dispatch(slice.actions.setInvoice(invoice));
        console.log(calendar, plans, notes, prescription, uploads)
        dispatch(slice.actions.getPatientsSuccess(response.data));
    }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}