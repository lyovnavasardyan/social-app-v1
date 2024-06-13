
import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchData } from "../../api/api";

const initialState = {
    
    selectedCategory:null
    
}

export const searchSelectedCategory = createAsyncThunk(
    'api/categorized',
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetchData.searchSelectedCategory(id);

            return response.data;
        } catch (error: any) {

            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }

            return rejectWithValue({ message: 'An unknown error occurred' });
        }
    }

);

const categorizedPhotographersSlice = createSlice({
    name: 'categorizedPhotographersSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(searchSelectedCategory.fulfilled, (state, { payload }) => {
               
                state.selectedCategory = payload.data
            })
          
    },
})

const mainState = (state:any) => state;

export const selectedCategory = createSelector(mainState, (state) => state. categorizedPhotographersData.selectedCategory)


export default categorizedPhotographersSlice.reducer;