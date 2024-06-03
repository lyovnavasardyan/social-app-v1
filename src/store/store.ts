import { configureStore } from "@reduxjs/toolkit";
import landingSlice from "./slices/landingSlice";
import registerSlice from "./slices/registerSlice";
import loginSlice from "./slices/loginSlice";
import userUpdateSlice from "./slices/userUpdateSlice";
import photosSlice from "./slices/photosSlice";
import allUserPhotosSlice from "./slices/allUserPhotosSlice";
import allPhotographersSlice from "./slices/photographers";
import clickedPhotographerSlice from "./slices/clickedPhotographerSlice";

const store = configureStore({
    reducer: {
        landingData: landingSlice,
        registerData: registerSlice,
        loginData: loginSlice,
        updatedData: userUpdateSlice,
        photosData: photosSlice,
        allUserPhotosData: allUserPhotosSlice,
        allPhotographersData:allPhotographersSlice,
        clickedPhotographerData:clickedPhotographerSlice
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store