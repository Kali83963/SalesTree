import { getToken , refreshToken } from "../../utils/tokenApi";
import { updateToken,loginUser,logoutUser } from "../../globalslice";
import {toast } from 'react-toastify';
import axios from 'axios';
import store from "../../store";
import { BASE_URL } from "../../utils/BASE_CONFIG";



export async function login(e, p) {
    try {
        const tokenResponse = await getToken(e, p);

        if (tokenResponse.error) {
            toast.error(tokenResponse.error);
            return tokenResponse.error;
        }

        localStorage.setItem('token',JSON.stringify(tokenResponse.data));
        const token = { ...tokenResponse.data};



        const url = `${BASE_URL}/accounts/login`;

        const loginResponse = await axios.post(url, {
            email: e,
            password: p
        },{
            headers:{
                'Authorization': token.token_type + ' ' + token.access_token
            }
        });

        if(loginResponse.error){
            toast.error(loginResponse.error);
            return loginResponse.error;
        }

        localStorage.setItem('user',JSON.stringify(loginResponse.data));

        const obj = { user: loginResponse.data, token };

        store.dispatch(loginUser(obj));

    } catch (error) {
        const {response} = error
        const errorMessage = response?.data?.error_description
        toast.error(errorMessage);
    }
}

export async function logout(){
    try{

        const url = `${BASE_URL}/token/revoke`;
        const logoutResponse = await  axios.post(url,{
            "token":JSON.parse(localStorage.getItem('token')).access_token
        })

       
        if( logoutResponse.data.message === "token revoked"){
            localStorage.clear();
            store.dispatch(logoutUser());
            
        }

    }catch(error){
        const {response} = error
        const errorMessage = response?.data.error_description
        toast.error(errorMessage);
    }

}
export async function SocialLogin(access_token,provider) {
    try {
 

        const url = `${BASE_URL}/token/social`;

        const loginResponse = await axios.post(url, {
            token: access_token,
            provider:provider
        },
        );

        if(loginResponse.error){
            toast.error(loginResponse.error);
            return loginResponse.error;
        }

        localStorage.setItem('token',JSON.stringify(loginResponse.data));
        const token = {...loginResponse.data}       
        const obj = { token };
        store.dispatch(updateToken(obj));

    } catch (error) {
        const {response} = error
        const errorMessage = response?.data?.error_description
        toast.error(errorMessage);
    }
}



export async function signUp(data){

    console.log(data)

    try{
        const url = `${BASE_URL}/accounts/register`;

        const signUpResponse = await axios.post(url, data);

        console.log(signUpResponse)

        if(signUpResponse.error){
            toast.error(signUpResponse.error);
            return signUpResponse.error;
        }

        const {email, password} = data;

        login(email,password) 



    }catch(error){
        const {response} = error
        const errorMessages = response?.data

        for(let errorMessage in errorMessages){
            errorMessages[errorMessage].map(error => toast.error(error))
            
        }


    }

}