import { createSlice } from '@reduxjs/toolkit'
import { API_CONFIG } from '../api';
import axiosConfig from '../api/axiosConfig';
import authService from '../service/auth/authService';
const slice = createSlice({
    name: 'auth',
    initialState: {
        token: null,

    },
    reducers: {

        Login(state, actions) {
            state.token = actions.payload
        },
        logout(state) {
            state.token = null;

        }
    },
})
export const authReducers = slice.reducer;
export const authActions = slice.actions;

