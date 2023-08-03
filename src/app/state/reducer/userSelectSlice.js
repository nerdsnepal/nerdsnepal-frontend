import { createSlice } from "@reduxjs/toolkit";

const UserSelectSlice = createSlice({
    name:"userSelect",
      initialState:{
        selectedUsers:[]
      },
      reducers:{
        clearAll:(state)=>{
            state.selectedUsers=[]
        },
           addUser:(state,action)=>{
                state.selectedUsers=[]
               state.selectedUsers.push(action.payload)
           },
           removeUser:(state,action)=>{
              state.selectedUsers = state.selectedUsers.filter((value)=>value!==action.payload)
           }
      }
})

export const {addUser,clearAll,removeUser} = UserSelectSlice.actions
export default UserSelectSlice.reducer