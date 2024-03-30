import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    sidebarShow: true,
    token:null,
}



const globalSlice = createSlice({
    name:'global',
    initialState:initialState,
    reducers:{
        toggleSidebar(state, action){
            state.sidebarShow = action.payload;
        },
        loginUser(state,action){
            state = {...state, ...action.payload};
            return state;
        },
        updateToken(state,action){
            state = {...state,token:action.payload};
            return state;
        },
        logoutUser(state,action){
            return initialState;
        }

    }
})

export const {toggleSidebar,updateToken,loginUser,logoutUser} = globalSlice.actions;

export default globalSlice.reducer;