
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

const initialState = {
    photographers:[],
    done:false
}

export const getAllPhotographers = createAsyncThunk(
    'api/photographers',
    async(_,{rejectWithValue})=>{
        try {
            const response = await fetchData.getAllPhotographers();

            return response.data;
        }catch (error: any) {

            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
    
);

const allPhotographersSlice =  createSlice({
    name: 'allPhotographersSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPhotographers.pending, (state) => {
                state.done = false
            })
            .addCase(getAllPhotographers.fulfilled, (state, {payload}) => {
                state.done = true
                state.photographers = payload.data
            })
            .addCase(getAllPhotographers.rejected, (state) => {
                state.done = false
            });
    },
})

const mainState = (state) => state;

export const photographers = createSelector(mainState, (state) => state.allPhotographersData.photographers)
export const done = createSelector(mainState, (state) => state?.allPhotographersData.done)

export default allPhotographersSlice.reducer