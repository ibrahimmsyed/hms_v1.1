import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';

// lodash
import camelCase from 'lodash/camelCase'; 
import mapKeys from 'lodash/mapKeys';

import axios from '../utils/axios';



const baseUrl = 'http:/.../WebServices/api';

class UserApiService extends EventEmitter {

    constructor() {
        super();
        this.state = {
            password: ''
        }
    }
    

    changePassword = async (password) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            let message;
            this.passwordChange = {
                current_password: password.oldPassword,
                new_password: password.newPassword,
                re_new_password: password.confirmNewPassword
            }
            const response = await axios.post('http://localhost:8000/auth/users/set_password/', this.passwordChange,{
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

    createUser = async (user) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            let message;
            
            this.userDetails = {
                username: user.username,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                registration_number: user.registrationNumber,
                calendar_color: user.calendarColor,
                display_picture: user.avatarUrl.preview,
                phone_number: user.phoneNumber,
                is_staff: user.isStaff,
                is_active: user.isActive,
                is_superuser: user.isSuperuser,
                is_front_office: user.isFrontOffice,
                is_back_office: user.isBackOffice,
                password: user.newPassword,
                re_password: user.confirmNewPassword
            }
            const response = await axios.post('http://localhost:8000/auth/users/', this.userDetails,{
                headers: {
                Authorization: `JWT ${accessToken}`
                }
            });
            const userData = mapKeys(response.data, (v, k) => camelCase(k)) // response.data.map(res=> )
            return userData
        }catch (error) {
            console.log(error); // this is the main part. Use the response property from the error object
        
            return error;
        }
    };

    updateUser = async (user, id) => {
        try {
            const accessToken = window.localStorage.getItem('accessToken');
            let message;
            
            this.userDetails = {
                username: user.username,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                registration_number: user.registrationNumber,
                calendar_color: user.calendarColor,
                display_picture: user.avatarUrl.preview,
                phone_number: user.phoneNumber,
                is_staff: user.isStaff,
                is_active: user.isActive,
                is_superuser: user.isSuperuser,
                is_front_office: user.isFrontOffice,
                is_back_office: user.isBackOffice,
            }
            const response = await axios.put(`http://localhost:8000/auth/update_profile/${id}/`, this.userDetails,{
                headers: {
                Authorization: `JWT ${accessToken}`
                }
            });
            const user = response.data.map(res=> mapKeys(res, (v, k) => camelCase(k)))
            return user
        }catch (error) {
            console.log(error); // this is the main part. Use the response property from the error object
        
            return error;
        }
    };

    getAllUser = async () => {
        try {
            this.accessToken = window.localStorage.getItem('accessToken');
            let message;
            const response = await axios.get('http://localhost:8000/auth/users/', 
            {
                headers: {
                Authorization: `JWT ${this.accessToken}`
                }
            });
            return response
        }catch (error) {
            console.log(error); // this is the main part. Use the response property from the error object
        
            return error;
        }
    };

    deleteUser = async (id) => {
        try {
            this.accessToken = window.localStorage.getItem('accessToken');
            let message;
            const response = await axios.delete(`http://localhost:8000/auth/delete-user/${id}/`, 
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
export default UserApiService;