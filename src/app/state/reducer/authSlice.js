'use client'
import {createSlice} from '@reduxjs/toolkit'


const AuthSlice =  createSlice({
    name:'auth',
    initialState:{
       isSuperAdmin:false,
       user:null,
       role:"user",
       status:"unauthenticated",
       accessToken:"",
       stores:[],
       selectedStore:null,
       storeId:null
    },
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload 
        },
       setRole:(state,action)=>{
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
            state.stores = action.payload
       },
       setSelectedStore:(state,action)=>{
            state.selectedStore = action.payload
            state.storeId = action.payload._id
       },
       setInit:(state)=>{
        state.role="user"
        state.isSuperAdmin=false
        state.status="unauthenticated"
        state.accessToken= ""
        state.user =null
       }
        
    }
})

export const {setUser,setRole,setInit,setAccessToken,setSelectedStore,setStores} = AuthSlice.actions 

export default AuthSlice.reducer 
