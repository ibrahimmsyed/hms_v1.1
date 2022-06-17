import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {EventEmitter} from 'events';

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
                username: user.userName,
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email,
                registration_number: user.registrationNumber,
                calendar_color: user.calendarColor,
                display_picture: user.avatarUrl.preview,
                phone_number: user.phoneNumber,
                is_staff: user.isStaff,
                is_active: user.isActive,
                is_superuser: user.isAdmin,
                // last_login: user.
                password: user.newPassword,
                re_password: user.confirmNewPassword
            }
            const response = await axios.post('http://localhost:8000/auth/users/', this.userDetails,{
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
export default UserApiService;