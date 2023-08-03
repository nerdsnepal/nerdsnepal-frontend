'use client'
import {  combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authSlice";
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";
import createStoreReducer from './reducer/createStoreSlice'
import userSelectReducer from './reducer/userSelectSlice'
const persistAuthConfig  = {
    key:'auth',
    storage
}
const reducers = combineReducers({
    auth: authReducer,
})


const persistedAuthReducer = persistReducer(
    persistAuthConfig,
    reducers
)

let store = configureStore({reducer:{
    persistedAuthReducer,
    createStore: createStoreReducer,
    userSelect: userSelectReducer
},middleware:[thunk]})
const persistor = persistStore(store)

export  {persistor,store}


