import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../../pages/LandingPage/type";

const initialState: InitialState = {
    title: 'Landing page'
   
}

const landingSlice = createSlice({
    name: "landingSlice",
    initialState,
    reducers: {}
})

export default landingSlice.reducer
