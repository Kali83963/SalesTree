// import { getToken , refreshToken } from "../../utils/tokenApi";
// import { updateToken,loginUser,logoutUser } from "../../redux/globalslice";
// import {toast } from 'react-toastify';
// import axios from 'axios';
// import store from "../../redux/store";
// import { BASE_URL } from "../../utils/BASE_CONFIG";



// export async function login(e, p) {
//     try {
//         const url = `${BASE_URL}/api/auth/login`;

//         const loginResponse = await axios.post(url, {
//             email: e,
//             password: p
//         },);

//         if(loginResponse.error){
//             toast.error(loginResponse.error);
//             return loginResponse.error;
//         }

//         console.log(loginResponse.data)

//         localStorage.setItem('user',JSON.stringify(loginResponse.data));
//         localStorage.setItem('token',JSON.stringify(loginResponse.data.user.jwt));
        

//     } catch (error) {
//         const {response} = error
//         const errorMessage = response?.data?.error_description
//         toast.error(errorMessage);
//     }
// }

// export async function logout(){
//     try{

//         const url = `${BASE_URL}/token/revoke`;
//         const logoutResponse = await  axios.post(url,{
//             "token":JSON.parse(localStorage.getItem('token')).access_token
//         })

       
//         if( logoutResponse.data.message === "token revoked"){
//             localStorage.clear();
//             store.dispatch(logoutUser());
            
//         }

//     }catch(error){
//         const {response} = error
//         const errorMessage = response?.data.error_description
//         toast.error(errorMessage);
//     }

// }
// export async function SocialLogin(access_token,provider) {
//     try {
 

//         const url = `${BASE_URL}/token/social`;

//         const loginResponse = await axios.post(url, {
//             token: access_token,
//             provider:provider
//         },
//         );

//         if(loginResponse.error){
//             toast.error(loginResponse.error);
//             return loginResponse.error;
//         }

//         localStorage.setItem('token',JSON.stringify(loginResponse.data));
//         const token = {...loginResponse.data}       
//         const obj = { token };
//         store.dispatch(updateToken(obj));

//     } catch (error) {
//         const {response} = error
//         const errorMessage = response?.data?.error_description
//         toast.error(errorMessage);
//     }
// }



// export async function signUp(data){

//     console.log(data)

//     try{
//         const url = `${BASE_URL}/api/auth/register`;

//         const signUpResponse = await axios.post(url, data);

//         console.log(signUpResponse)

//         if(signUpResponse.error){
//             toast.error(signUpResponse.error);
//             return signUpResponse.error;
//         }

//         // const {email, password} = data;

//         // login(email,password) 
//         localStorage.setItem('user',JSON.stringify(signUpResponse.data));
//         localStorage.setItem('token',JSON.stringify(signUpResponse.data.user.jwt));



//     }catch(error){
//         const {response} = error
//         const errorMessages = response?.data

//         for(let errorMessage in errorMessages){
//             errorMessages[errorMessage].map(error => toast.error(error))
            
//         }


//     }

// }