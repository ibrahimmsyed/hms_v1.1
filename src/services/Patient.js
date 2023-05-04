import React, {Component} from 'react';
import ReactDOM from 'react-dom';

// lodash
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';

import axios from '../utils/axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

class PatientApiService {
    
    createPatient = async (item) => {
        try {
            this.patient = item
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await axios.post(`${API_ENDPOINT}/patientdetails/`, this.patient,{
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
            const formData = new FormData();
            Object.keys(item).forEach(key => { 
                formData.append(key, item[key]);
            })
            this.patient = item
            const response = await axios.put(`${API_ENDPOINT}/patientdetails/${id}/`, formData,{
                headers: {
                Authorization: `JWT ${accessToken}`,
                'Content-type':'multipart/form-data',
                'Content-Disposition': `attachment; filename=${item?.dop?.name}`,
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
            const response = await axios.delete(`${API_ENDPOINT}/inventorydetails/${id}/`, 
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