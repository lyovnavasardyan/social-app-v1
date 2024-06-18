import axios from "axios"

const BASE_URL = 'https://pinetech.org/api/photographers';

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
    },
    getAllPhotos() {
        return axios.get('https://pinetech.org/api/photos')
    },
    getAllPhotographers(params:any) {
        return axios.get(`https://pinetech.org/api/photographers?`, {
            params,
            headers: {
                "Content-Type": 'application/json'
            }
        });
    },
    
    getSinglePhotographer(data: object){
            
        return axios.post(`https://pinetech.org/api/get-photographer-photos?page=${data.currentPage}`,data,{
            headers:{
                "Content-Type":'application/json'
            }
        })
    },
    searchPhotographerPage(data:any) {
        return axios.get(`https://pinetech.org/api/photographer/search?search=${data}`, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
    },
}

