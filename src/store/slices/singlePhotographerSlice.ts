import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

const initialState = {
  photographer: null,
  photos: [],
  lastPage: null,
  loading: false,
  error: null,
};

export const getPhotographerById = createAsyncThunk(
  'photographer/getById',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetchData.getSinglePhotographer(data);
      console.log(response.data);
      
      return response.data;


    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
);

const photographerSlice = createSlice({
  name: 'photographer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotographerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhotographerById.fulfilled, (state, { payload }) => {
        state.loading = false;  
        state.photographer = payload.data.data[0].user;
        state.photos = payload.data.data;
        
        state.lastPage = payload.data.last_page
      })
      .addCase(getPhotographerById.rejected, (state: any, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

const mainState = (state: any) => state;

export const photographer = createSelector(mainState, (state) => state.singlePhotographerData.photographer);
export const photos = createSelector(mainState, (state) => state.singlePhotographerData.photos);
export const loading = createSelector(mainState, (state) => state.singlePhotographerData.loading);
export const lastPage = createSelector(mainState, (state) => state.singlePhotographerData.lastPage);


export default photographerSlice.reducer;