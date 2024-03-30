import { logoutSuccess, registerSuccess, requestFailed, requestLoading, requestSuccess } from "./authSlicer";
import * as authService from '../../Services/auth/index';
import { toast } from "react-toastify";


export const login = ( loginData ) =>
  async (dispatch) => {
    dispatch(requestLoading());
    const {email,password} = loginData;
    const data = await authService.login(email,password);
    

    if (data) {
    //   const auth_state = {
    //     current: data.result,
    //     isLoggedIn: true,
    //     isLoading: false,
    //     isSuccess: true,
    //   };
    //   window.localStorage.setItem('auth', JSON.stringify(auth_state));
    //   window.localStorage.removeItem('isLogout');
      dispatch(requestSuccess(data));
      toast.success('Login successful');
    } else {
      dispatch(requestFailed());
    }
};

  export const signUp = (registerData) =>
  async (dispatch) => {
    dispatch(requestLoading());
    const data = await authService.register(registerData);

    if (data) {
      dispatch(registerSuccess(data));
    } else {
      dispatch(requestFailed());
    }
  };


export const logout = () => 
async (dispatch) => {
    dispatch(logoutSuccess());
}