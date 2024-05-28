import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isUpdating: false,
    updateSuccess: false,
    updateError: null,
    userInfo: {
        name: '',
        location: '',
        about: '',
        facebook:'',
        instagram:'',
        phone:''
    },
    error:null
};

export const updateUserAsync = createAsyncThunk(
    'user/update',
    async (payload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('jwtToken'); 
            const response = await axios.post("https://pinetech.org/api/user-info", payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
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

const userUpdateSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateUserAsync.pending, (state) => {
                state.isUpdating = true;
                state.updateError = null;
                state.updateSuccess = false;
            })
            .addCase(updateUserAsync.fulfilled, (state, { payload }) => {
                state.isUpdating = false;
                state.updateSuccess = true;
                state.userInfo.name = payload.user.name;
                state.userInfo.location = payload.user.location;
                state.userInfo.about = payload.user.about;
                state.userInfo.facebook = payload.user.fb,
                state.userInfo.instagram = payload.user.instagram,
                state.userInfo.phone = payload.user.phone
            })
            .addCase(updateUserAsync.rejected, (state, action:any) => {
                state.isUpdating = false;
                state.updateError = action.payload.message || 'Failed to update user information';
            });
    },
});

export const userUpdateActions = userUpdateSlice.actions;
export default userUpdateSlice.reducer;