import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';

// lodash
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';

import axios from '../utils/axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

const baseUrl = 'http:/.../WebServices/api';

class PracticeDetailsApiService extends EventEmitter {

    constructor() {
        super();
        this.state = {
            password: ''
        }
    }
    
    updatePracticeDetails = async (details, id) => {
        try {
            this.practiceDetails = {...details, logo: details.logo.preview}
            const accessToken = window.localStorage.getItem('accessToken');
            const response = await axios.put(`${API_ENDPOINT}/practicedetails/${id}/`, this.practiceDetails,{
                headers: {
                Authorization: `JWT ${accessToken}`
                }
            });
            return response
        }catch (error) {
            console.log(error); // this is the main part. Use the response property from the error object
        
            return error;
        }
    };

}
export default PracticeDetailsApiService;