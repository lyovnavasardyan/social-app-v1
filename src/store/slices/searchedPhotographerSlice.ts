import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

const initialState = {
    searchedPhotographers: []
};

export const searchPhotographerPage = createAsyncThunk(
    'photographers/searchPage',
    async (searchTerm, { rejectWithValue }) => {
        try {
            const response = await fetchData.searchPhotographerPage(searchTerm);
            return response.data; 
        } catch (error:any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

const searchPhotographersSlice = createSlice({
    name: 'searchPhotographers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchPhotographerPage.fulfilled, (state, { payload }) => {
                state.searchedPhotographers = payload.data.data; 
            });
    },
});

const mainState = (state) => state;

export const searchedPhotographers = createSelector(mainState, (state) => state.searchedPhotographerData.searchedPhotographers);

export default searchPhotographersSlice.reducer;