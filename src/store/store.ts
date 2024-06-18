import { configureStore } from "@reduxjs/toolkit";
import landingSlice from "./slices/landingSlice";
import registerSlice from "./slices/registerSlice";
import loginSlice from "./slices/loginSlice";
import userUpdateSlice from "./slices/userUpdateSlice";
import photosSlice from "./slices/photosSlice";
import allUserPhotosSlice from "./slices/allUserPhotosSlice";
import allPhotographersSlice from "./slices/photographers";
import singlePhotographerSlice from "./slices/singlePhotographerSlice";
import searchedPhotographerSlice from "./slices/searchedPhotographerSlice";
import modalPhotoSlice from "./slices/modalPhotoSlice";

const store = configureStore({
    reducer: {
        landingData: landingSlice,
        registerData: registerSlice,
        loginData: loginSlice,
        updatedData: userUpdateSlice,
        photosData: photosSlice,
        allUserPhotosData: allUserPhotosSlice,
        allPhotographersData:allPhotographersSlice,
        singlePhotographerData:singlePhotographerSlice,
        searchedPhotographerData:searchedPhotographerSlice,
        modalPhotoData: modalPhotoSlice,
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store