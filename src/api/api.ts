import axios from "axios"

export const fetchData = {
    sendRegisterData(data: object) {
        return axios.post('https://pinetech.org/api/auth/register', data, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
    },
    sendLoginData(data: object) {
        return axios.post('https://pinetech.org/api/auth/login', data, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
    }
}

