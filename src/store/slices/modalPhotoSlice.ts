import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import axios from "axios";

interface ModalPhotoState {
    photos: Array<object>,
    done: boolean
}

const initialState: ModalPhotoState = {
    photos: [],
    done: false
}

// export const uploadPhoto = createAsyncThunk(
//     'photo/upload',
//     async (_, { rejectWithValue }) => {

//         try {
//             const res = await axios.post('https://pinetech.org/api/add-single-photo', formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                     'Authorization': `Bearer ${initialState.token}`
//                 }
//             })
//             return res.data
//         } catch (error) {
//             return rejectWithValue('upload error')
//         }
//     }
// )

export const getRandomPhotos = createAsyncThunk(
    'modal-photos',
    async (data, {rejectWithValue}) => {
        try {
            const response = await axios.post(
                "https://pinetech.org/api/get-random-photos-by-category",
                {
                    currentPhotoId: data.id,
                    id: data.categoryId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);

            return response.data;
        } catch (error) {
            console.error("Error fetching random photos:", error);
            throw error;
        }
    }
)

const ModalPhotoSlice = createSlice({
    name: "modalPhotoSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getRandomPhotos.pending, (state) => {
                state.done = false
            })
            .addCase(getRandomPhotos.fulfilled, (state, { payload }) => {
                state.photos = payload.data
                state.done = true
            })
            .addCase(getRandomPhotos.rejected, (state, { payload }) => {
                state.done = false
            })
    }
})

const mainState = (state: any) => state;

export const modalPhotos = createSelector(
    mainState, (state) => state?.modalPhotoData.photos);

export default ModalPhotoSlice.reducer