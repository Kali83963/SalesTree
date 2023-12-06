import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    sidebarShow: true,
}



const globalSlice = createSlice({
    name:'global',
    initialState:initialState,
    reducers:{
        toggleSidebar(state, action){
            state.sidebarShow = action.payload;
        },

    }
})

export const {toggleSidebar} = globalSlice.actions;

export default globalSlice.reducer;