import { configureStore } from "@reduxjs/toolkit";
import landingSlice from "./slices/landingSlice";
import registerSlice from "./slices/registerSlice";
import loginSlice from "./slices/loginSlice";

const store = configureStore({
    reducer: {
        landingData: landingSlice,
        registerData: registerSlice,
        loginData:loginSlice
    }
})

export type Rootstate = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store