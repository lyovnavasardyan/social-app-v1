import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

interface LoginPayload {
    email: string;
    password: string;
}

const initialState = {
    title: 'Login',
    authenticated: !!localStorage.getItem('jwtToken'),
    token: null,
    isFetching: false,
    error: null,
};

export const loginAsync = createAsyncThunk(
    'auth/login',
    async (payload:LoginPayload, { rejectWithValue }) => {
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

export const logOutAsync = createAsyncThunk(
    'auth.logout',
    async () => {
        localStorage.removeItem('jwtToken')
    }
)

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
            })
            .addCase(loginAsync.rejected, (state, action: any) => {
                state.isFetching = false;
                state.error = action.payload.message || 'Email or password are incorrect';
            });

        builder.addCase(logOutAsync.fulfilled, (state) => {
            state.authenticated = false
        })
    },
});



const mainState = (state:any) => state;

export const authSelector = createSelector(
    mainState, (state) => state?.loginData.authenticated);

    export const isLoadingSelector = createSelector(
        mainState, (state) => state?.loginData.isFetching);

export default loginSlice.reducer
