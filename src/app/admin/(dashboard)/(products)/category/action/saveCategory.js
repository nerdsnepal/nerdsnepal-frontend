"use server"

const { API_URL } = require("@/app/lib/utils/utils")
const { default: axios } = require("axios")


export const save_category = async({name,imageUrl,status,accessToken,storeId})=>{
    const headers = {
        'authorization':`bearer ${accessToken}`
    }
    const data ={
        name,urls:imageUrl,status,storeId
    }
    let response = await axios.post(API_URL('admin/category'),data,{headers:headers})
    return response.data

}