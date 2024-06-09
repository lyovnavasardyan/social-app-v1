import { ButtonType } from "../pages/LandingPage/type";
import { LoginType } from "../pages/LoginPage/type";
import { RegisterType } from "../pages/RegisterPage/type";

export const menuButtonsInfo: ButtonType[] = [
    {
        id: 1,
        text: "Photographers",
        className: 'photographers_btn',
        path: "photographers"
    },
    {
        id: 2,
        text: "Photos",
        className: 'photos_btn',
        path: "photos"
    }
]

export const buttonsInfo: ButtonType[] = [
    {
        id: 1,
        text: "Log in",
        className: 'login_btn',
        path: "login"
    },
    {
        id: 2,
        text: "Register",
        className: 'register_btn',
        path: "register"
    }
]

export const registerConfig: RegisterType = {
    title: 'Register'
}

export const loginConfig: LoginType = {
    title: 'Login',
    authenticated: false
}

export const BACKEND_URL = 'https://pinetech.org';