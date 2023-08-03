import { createSlice } from "@reduxjs/toolkit";
const CreateStoreSlice  = createSlice({
        name:"createStore",
        initialState:{
            isOpen:false
        },
        reducers:{
            toggler:(state)=>{
                state.isOpen = !state.isOpen
            }
        }
})

export const {toggler} = CreateStoreSlice.actions
export default CreateStoreSlice.reducer