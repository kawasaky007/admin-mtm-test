import axios from 'axios';
import queryString from 'query-string';
import { message } from 'antd';
import { API_URL } from './api';


const axiosConfig = axios.create(

    {
        baseURL: API_URL,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Access-Control-Allow-Origin': '*',
        },
        paramsSerializer: (params) => queryString.stringify(params),
    });

axiosConfig.interceptors.request.use(async (config) => {
    const customHeaders: any = {};


    let auth: any = localStorage.getItem('persist:root');
    let stringParse = JSON.parse(auth)
    const accessToken = JSON.parse(stringParse.auth).token


    if (accessToken) {
        customHeaders.Authorization = accessToken;
    }

    return {
        ...config,
        headers: {
            ...customHeaders, // auto attach token
            ...config.headers, // but you can override for some requests
        },
    };
});
axiosConfig.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        message.error(error.response.data.error)
        if (error.response.status === 401) {
            localStorage.removeItem('Bearer');
        }
        if (error.response.status === 404) {
            localStorage.removeItem('Bearer');
        }
        throw error;
    }
);
export default axiosConfig;
