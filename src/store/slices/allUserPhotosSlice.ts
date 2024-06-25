import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";
import { PhotoError, PhotoSlide } from "../../components/Slide/PhotosSlide/type";

const initialState = {
    photos: [],
    done: false
}

export const getAllPhotos = createAsyncThunk<PhotoSlide[], void, { rejectValue: PhotoError }>(
    'api/photos',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchData.getAllPhotos()

            return response.data;
        } catch (error: any) {

            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }
);


const allPhotosSlice = createSlice({
    name: 'allPhotosSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPhotos.pending, (state) => {
                state.done = false
            })
            .addCase(getAllPhotos.fulfilled, (state, { payload }) => {
                state.done = true
                state.photos = payload.data
            })
            .addCase(getAllPhotos.rejected, (state) => {
                state.done = false
            });
    },
})

const mainState = (state: any) => state

export const photos = createSelector(mainState, (state) => state.allUserPhotosData.photos)
export const done = createSelector(mainState, (state) => state?.allUserPhotosData.done)

export default allPhotosSlice.reducer