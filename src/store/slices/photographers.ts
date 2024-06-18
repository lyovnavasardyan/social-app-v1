
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

const initialState = {
    photographers: [],
    done: false,
    selectedCategory: null,
};

export const getAllPhotographers = createAsyncThunk(
    'photographers/fetchPhotographers',
    async ({ id, page }, { rejectWithValue }) => {
        try {
            const params = {};
            if (id) params.category = id;
            if (page) params.page = page;

            const response = await fetchData.getAllPhotographers(params);

            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);

const photographersSlice = createSlice({
    name: 'photographers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPhotographers.pending, (state) => {
                state.done = false;
            })
            .addCase(getAllPhotographers.fulfilled, (state, { payload }) => {
                state.done = true;
                state.photographers = payload.data;

                if (payload.category) {
                    state.selectedCategory = payload.data;
                }
            })
            .addCase(getAllPhotographers.rejected, (state) => {
                state.done = false;
            });
    },
});

const mainState = (state) => state;

export const photographers = createSelector(mainState, (state) => state.allPhotographersData.photographers);
export const done = createSelector(mainState, (state) => state.allPhotographersData.done);
export const selectedCategory = createSelector(mainState, (state) => state.allPhotographersData.selectedCategory);

export default photographersSlice.reducer;