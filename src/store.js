import { configureStore } from "@reduxjs/toolkit";
import globalReducer from './globalslice'




const store = configureStore({
    reducer:{
        global:globalReducer ,      
    }
})

export default store;