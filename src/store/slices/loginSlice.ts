import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';


const initialState = {
    title: 'Login',
    authenticated: false,
    token: null,
    isFetching: false,
    error: null,
};

export const loginAsync =  createAsyncThunk (
    'auth/login',
    async (payload, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://pinetech.org/api/auth/login", payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error:any) {
           
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
                state.authenticated = !!payload.access_token;
                state.token = payload.access_token;
                state.isFetching = false;
            })
            .addCase(loginAsync.rejected, (state, action:any) => {
                state.isFetching = false;
                state.error = action.payload.message || 'Email or password are incorrect'; 
            });
    },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;