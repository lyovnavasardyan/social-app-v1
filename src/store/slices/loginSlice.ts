import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { fetchData } from "../../api/api";


const initialState = {
    title: 'Login',
    authenticated: false,
    token: null,
    isFetching: false,
    error: null,
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await fetchData.sendLoginData(payload)
            return response.data;
        } catch (error: any) {

            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.isFetching = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, { payload }) => {
                state.authenticated = !!payload.token
                state.token = payload.token
                state.isFetching = false
                localStorage.setItem('jwtToken', payload.token);
                //localStorage.setItem('name',payload.user.name);
                //localStorage.setItem('email',payload.user.email)
            })
            .addCase(loginAsync.rejected, (state, action: any) => {
                state.isFetching = false;
                state.error = action.payload.message || 'Email or password are incorrect';
            });
    },
});



// create folder for selectors,  slices and thunks
const mainState = (state:any) => state;

export const authSelector = createSelector(
    mainState, (state) => state?.loginData.authenticated);

    export const isLoadingSelector = createSelector(
        mainState, (state) => state?.loginData.isFetching);

export default loginSlice.reducer