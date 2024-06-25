
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

interface ModalPhotoState {
    photographers: object[];
    done: boolean;
    selectedCategory: number | null;
}

const initialState: ModalPhotoState = {
    photographers: [],
    done: false,
    selectedCategory: null,
};

type ErrorType = { message: string } | undefined;
type IdType = number | undefined;
type PageType = number | undefined;

export const getAllPhotographers = createAsyncThunk(
    'photographers/fetchPhotographers',
    async ({ id, page }: { id?: IdType, page?: PageType }, { rejectWithValue }) => {
        try {
            const params: any = {};
            if (id) params.category = id;
            if (page) params.page = page;

            const response = await fetchData.getAllPhotographers(params);

            return response.data;
        } catch (error:ErrorType|any) {
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

const mainState = (state:any) => state;

export const photographers = createSelector(mainState, (state) => state.allPhotographersData.photographers);
export const done = createSelector(mainState, (state) => state.allPhotographersData.done);
export const selectedCategory = createSelector(mainState, (state) => state.allPhotographersData.selectedCategory);

export default photographersSlice.reducer;