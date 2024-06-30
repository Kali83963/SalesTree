
import axios from 'axios';
import { BASE_URL } from "../../utils/BASE_CONFIG";
import errorHandler from '../../requests/errorHandler';



// export async function login(e, p) {
//     try {
//         const url = `${BASE_URL}/api/auth/login`;

//         const response = await axios.post(url, {
//             email: e,
//             password: p
//         },);

//         if(response.error){
//             toast.error(response.error);
//             return response.error;
//         }

//         console.log(response.data)

//     } catch (error) {
//         const {response} = error
//         const errorMessage = response?.data?.error_description
//         toast.error(errorMessage);
//     }
// }

export const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email,
        password
      });
  
      if (response.error) {
        errorHandler(response.error);
      }
  
      return response.data;
    } catch (error) {
      errorHandler(error);
      throw new Error(error.message)
    }
  };

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

       
    
//     }catch(error){
//         const {response} = error
//         const errorMessages = response?.data

//         for(let errorMessage in errorMessages){
//             errorMessages[errorMessage].map(error => toast.error(error))
            
//         }


//     }

// }

export const register = async (registerData) => {
    try {
      const url = `${BASE_URL}auth/register`;
      const response = await axios.post(url, registerData);
     

      if (response.error) {
        return errorHandler(response.error);
      }

      const { status, data } = response;

  
      return data;
    } catch (error) {
        return errorHandler(error);
    }
  };