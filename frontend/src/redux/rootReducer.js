import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from './globalslice'
import authReducer from './auth/authSlicer';


export const rootReducer = combineReducers({
    global:globalReducer,
    auth:authReducer
})