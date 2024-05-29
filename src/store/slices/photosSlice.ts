import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PhotoState {
    uploading: boolean,
    error: string | null,
    url: string | null
}

const initialState: PhotoState = {
    uploading: false,
    error: null,
    url: null
}

export const uploadPhoto = createAsyncThunk(
    'photo/upload',
    async (file: File, { rejectWithValue }) => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            const res = await axios.post('https://pinetech.org/api/add-single-photo', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    
                }
            })
            return res.data
        } catch(error) {
            return rejectWithValue('upload error')
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
            })
            .addCase(uploadPhoto.fulfilled, (state, action) => {
                state.uploading = false
                state.url = action.payload.url
            })
            .addCase(uploadPhoto.rejected, (state, action) => {
                state.uploading = false
                state.error = action.payload as string
            })
    }
})

export default photosSlice.reducer