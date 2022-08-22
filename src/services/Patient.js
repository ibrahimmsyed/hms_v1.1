import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// lodash
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';

import axios from '../utils/axios';


class PatientApiService {
    
    createPatient = async (item) => {
        try {
            this.patient = item
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await axios.post('http://localhost:8000/auth/patientdetails/', this.patient,{
                headers: {
                Authorization: `JWT ${accessToken}`
                }
            });
            return response
        }catch (error) {
            console.log(error);
            return error;
        }
    };

    updatePatient = async (item, id) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            this.patient = item
            const response = await axios.put(`http://localhost:8000/auth/patientdetails/${id}/`, this.patient,{
                headers: {
                Authorization: `JWT ${accessToken}`
                }
            });
            const items = response;
            return items
        }catch (error) {
            console.log(error); // this is the main part. Use the response property from the error object
        
            return error;
        }
    };

    deletePatient = async (id) => {
        try {
            this.accessToken = window.localStorage.getItem('accessToken');
            let message;
            const response = await axios.delete(`http://localhost:8000/auth/inventorydetails/${id}/`, 
            {
                headers: {
                Authorization: `JWT ${this.accessToken}`
                }
            });
            return response
        }catch (error) {
            return error;
        }
    };

    
}
export default PatientApiService;