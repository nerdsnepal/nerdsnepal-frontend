'use client'
import {createSlice} from '@reduxjs/toolkit'


const AuthSlice =  createSlice({
    name:'auth',
    initialState:{
       isSuperAdmin:false,
       role:"user",
       status:"unauthenticated",
       accessToken:"",
       storesId:[],
       selectedStore:""
    },
    reducers:{
       setRole:(state,action)=>{
        console.log(action.payload);
        state.role= action.payload
        if(state.role==="superuser")
            state.isSuperAdmin= true
        else 
            state.isSuperAdmin = false
       },
       setAccessToken:(state,action)=>{
        state.accessToken= action.payload
       },
       setStores:(state,action)=>{
            state.storesId = action.payload
       },
       setSelectedStore:(state,action)=>{
            state.selectedStore = action.state
       },
       setInit:(state)=>{
        state.role="user"
        state.isSuperAdmin=false
        state.status="unauthenticated"
        state.accessToken= ""
       }
        
    }
})

export const {setRole,setInit,setAccessToken,setSelectedStore,setStores} = AuthSlice.actions 

export default AuthSlice.reducer 
