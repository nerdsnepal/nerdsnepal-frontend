'use client'
import {createSlice} from '@reduxjs/toolkit'


const FilterSlice =  createSlice({
    name:'filter',
    initialState:{
        categories:[],
        price:{minimum:0,maximum:0}
    },
    reducers:{
        clear:(state)=>{
            state.categories=[];
            state.price={minimum:0,maximum:0};

        },
        setPrice:(state,action)=>{
            state.price = action.payload
        },
        setCategories:(state,action)=>{
            state.categories = action.payload
        },

    }
})

export const {clear,setPrice,setCategories,} = FilterSlice.actions 

export default FilterSlice.reducer 
