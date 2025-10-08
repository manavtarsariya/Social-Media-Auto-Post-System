
import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name:"post",
    initialState:{
        editpost:null
    },
    reducers:{
        setEditpost:(state, action)=>{
            // console.log(action.payload)
            state.editpost = action.payload;
        }
    }
});
export const {setEditpost} = postSlice.actions;
export default postSlice.reducer;