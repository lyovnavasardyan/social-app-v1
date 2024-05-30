import { createAsyncThunk, createSlice,createSelector } from "@reduxjs/toolkit";
import axios from "axios";

interface PhotoState {
    uploading: boolean,
    error: string | null,
    url: string | null,
    token: string | null,
    allPhotos: any
    done:boolean
}

const initialState: PhotoState = {
    uploading: false,
    error: null,
    url: null,
    token: localStorage.getItem("jwtToken"),
    allPhotos: [],
    done:false
}

export const uploadPhoto = createAsyncThunk(
    'photo/upload',
    async (file: File, { rejectWithValue }) => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('category_id', '0')
        formData.append('title', 'nkar')

        try {
            const res = await axios.post('https://pinetech.org/api/add-single-photo', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${initialState.token}`
                }
            })
            return res.data
        } catch (error) {
            return rejectWithValue('upload error')
        }
    }
)

export const getPhotos = createAsyncThunk(
    'photo/get',
    async (_, {rejectWithValue}) => {
        try {
            const res = await axios.get('https://pinetech.org/api/get-photos', {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${initialState.token}`
                }
            })

            return res.data
        } catch(error) {
            return rejectWithValue('failed geting photo')
        }
    }
)

const photosSlice = createSlice({
    name: "photosSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadPhoto.pending, (state) => {
                state.uploading = true
                state.error = null
                state.url = null
                state.done = false
            })
            .addCase(uploadPhoto.fulfilled, (state, action) => {
                state.uploading = false
                state.url = action.payload.url
                state.done = true
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.uploading = false
                state.error = action.payload as string
                state.done = false
            })

            .addCase(getPhotos.fulfilled, (state, action) => {
                state.allPhotos = action.payload.data.data
            })
    }
})

const mainState = (state:any) => state;

export const isUploadedSelector = createSelector(
    mainState, (state) => state?.photosData.done);

export default photosSlice.reducer