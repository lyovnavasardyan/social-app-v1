import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

interface RegisterPayload {
    username: string;
    email: string;
    password: string;
}

const initialState = {
    
};

export const registerAsync = createAsyncThunk(
    'auth/register',
    async (payload: RegisterPayload, { rejectWithValue }) => {
        try {
            const response = await fetchData.sendRegisterData(payload);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

const registerSlice = createSlice({
    name: "registerSlice",
    initialState,
    reducers: {

    }
})

export default registerSlice.reducer