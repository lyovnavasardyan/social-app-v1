import { configureStore } from "@reduxjs/toolkit";
import landingSlice from "./slices/landingSlice";
import registerSlice from "./slices/registerSlice";
import loginSlice from "./slices/loginSlice";
import userUpdateSlice from "./slices/userUpdateSlice";
import photosSlice from "./slices/photosSlice";

const store = configureStore({
    reducer: {
        landingData: landingSlice,
        registerData: registerSlice,
        loginData: loginSlice,
        updatedData: userUpdateSlice,
        photosData: photosSlice
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store