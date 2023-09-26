'use client'
import {  configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import createStoreReducer from './reducer/createStoreSlice'
import userSelectReducer from './reducer/userSelectSlice'



//const persistAuthConfig  = {
//    key:'auth',
//    storage
//}
//const reducers = combineReducers({
//    auth: authReducer,
//})


//const persistedAuthReducer = persistReducer(
//    persistAuthConfig,
//    reducers
//)

//let persitor_store = configureStore({reducer:{
//    persistedAuthReducer
//},middleware:[thunk]})

let store  = configureStore({
    reducer:{
        auth:authReducer,
        createStore: createStoreReducer,
        userSelect: userSelectReducer,
     
    },
})
//const persistor = persistStore(persitor_store)

export  {store}


