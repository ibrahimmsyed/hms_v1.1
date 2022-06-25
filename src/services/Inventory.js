import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';

// lodash
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';

import axios from '../utils/axios';



const baseUrl = 'http:/.../WebServices/api';

class InventoryApiService extends EventEmitter {

    constructor() {
        super();
        this.state = {
            item: ''
        }
    }
    
    createInventory = async (item) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            this.inventory = item
            const response = await axios.post('http://localhost:8000/auth/inventorydetails/', this.inventory,{
                headers: {
                Authorization: `JWT ${accessToken}`
                }
            });
            return response.status
        }catch (error) {
            console.log(error);
            return error;
        }
    };

    updateInventory = async (item, id) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            let message;
            
            this.inventoryDetail = item
            const response = await axios.put(`http://localhost:8000/auth/inventorydetails/${id}/`, this.inventoryDetail,{
                headers: {
                Authorization: `JWT ${accessToken}`
                }
            });
            const items = response.data;
            return items
        }catch (error) {
            console.log(error); // this is the main part. Use the response property from the error object
        
            return error;
        }
    };

    deleteInventory = async (id) => {
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
export default InventoryApiService;