import axios from 'axios';
import { BASE_URL } from './BASE_CONFIG';


export function getToken(e,p){
    const url = `${BASE_URL}/token`

    const res = axios.post(url,{
        "email":e,
        "password":p
    })

    return res;
}

export function refreshToken(token){
    if(token){
        const url = `${BASE_URL}/token/refresh`

        const res = axios.post(url,{
            "refresh_token":token
        })

        return res
    }else{
        localStorage.clear()
    }
}