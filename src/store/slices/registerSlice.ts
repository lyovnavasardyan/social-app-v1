import { createSlice } from "@reduxjs/toolkit";
import { EnumRegister } from "../../pages/RegisterPage/type";

const initialState: EnumRegister = {
    title: "Register",
    inputsInfo: [
        {
            id: 1,
            type: "text",
            placeholder: 'name'
        },
        {
            id: 2,
            type: "text",
            placeholder: 'email'
        },
        {
            id: 3,
            type: "text",
            placeholder: 'password'
        }
    ]
}

const registerSlice = createSlice({
    name: "registerSlice",
    initialState,
    reducers: {

    }
})

export default registerSlice.reducer